import { NextResponse } from 'next/server';

export async function POST() {
  try {

    return NextResponse.json({ success: true, message: 'Quiz submitted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error submitting quiz:', error);
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}
