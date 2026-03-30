import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebaseAdmin';

// Utility to get current and previous month keys e.g., "2026-03", "2026-02"
function getMonthKeys() {
  const now = new Date();
  const currentMonthStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  
  // Previous month calculation
  const prevDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const prevMonthStr = `${prevDate.getFullYear()}-${String(prevDate.getMonth() + 1).padStart(2, '0')}`;
  
  return { currentMonthStr, prevMonthStr };
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // 1. Validations
    if (!body.topic || !body.resource) {
      return NextResponse.json({ error: 'Missing topic or resource fields' }, { status: 400 });
    }

    // 2. Filter by topic
    if (body.topic !== 'orders_v2') {
      return NextResponse.json({ message: 'Topic ignored. Looking for orders_v2.' }, { status: 200 });
    }

    // 3. Increment counters
    // MOCK: In a real scenario, you use the "resource" (e.g. /orders/123) to fetch the order details via ML API
    // using your access token. Example:
    // const orderRes = await fetch(`https://api.mercadolibre.com${body.resource}`, { headers: { Authorization: `Bearer ${...}` } });
    // const order = await orderRes.json();
    // const currentOrderValue = order.total_amount;
    const currentOrderValue = 150.00; // Mocked value, modify when API is ready!

    const { currentMonthStr, prevMonthStr } = getMonthKeys();
    
    const currentMonthRef = adminDb.collection('faturamento_mensal').doc(currentMonthStr);
    const previousMonthRef = adminDb.collection('faturamento_mensal').doc(prevMonthStr);

    // Using a Transaction to read previous state and safely increment both fields and calculating the comparison
    await adminDb.runTransaction(async (transaction: any) => {
      const currentMonthDoc = await transaction.get(currentMonthRef);
      const previousMonthDoc = await transaction.get(previousMonthRef);
      
      let prevMonthFaturado = 0;
      if (previousMonthDoc.exists) {
        prevMonthFaturado = previousMonthDoc.data()?.totalFaturado || 0;
      }

      let newTotalFaturado = currentOrderValue;
      let newTotalPedidos = 1;

      if (currentMonthDoc.exists) {
        const currentData = currentMonthDoc.data()!;
        newTotalFaturado = (currentData.totalFaturado || 0) + currentOrderValue;
        newTotalPedidos = (currentData.totalPedidos || 0) + 1;
      }

      // 4. Calculate comparacaoMesAnterior
      let comparacao = 0;
      if (prevMonthFaturado > 0) {
        comparacao = ((newTotalFaturado - prevMonthFaturado) / prevMonthFaturado) * 100;
      } else if (newTotalFaturado > 0) {
        comparacao = 100; // if it was 0 last month and we have sales this month.
      }

      // Write changes
      transaction.set(currentMonthRef, {
        mes: currentMonthStr,
        totalFaturado: newTotalFaturado,
        totalPedidos: newTotalPedidos,
        comparacaoMesAnterior: parseFloat(comparacao.toFixed(2))
      }, { merge: true });
    });

    // 5. Return 200 OK so ML confirms receipt
    return NextResponse.json({ message: 'Order processed successfully' }, { status: 200 });

  } catch (error) {
    console.error('Webhook Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
