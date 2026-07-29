import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db/connection';
import Order from '@/lib/models/Order';
import { generateOrderId } from '@/lib/utils';

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();

    if (!body.customer || !body.items || !body.items.length || !body.total) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const orderId = generateOrderId();
    const order = await Order.create({
      ...body,
      orderId,
      status: 'pending',
      paymentStatus: 'pending',
    });

    return NextResponse.json({ success: true, orderId, order }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
  }
}
