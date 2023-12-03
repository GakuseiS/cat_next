import { NextRequest, NextResponse } from 'next/server';
import { serverApi } from '@/api/serverApi';
import { getErrorData } from '@/utils/getErrorData';

type RequestInfo = {
  params: {
    __endpoint: string[];
  };
};

export {
  clientRequestHandler as GET,
  clientRequestHandler as POST,
  clientRequestHandler as PUT,
  clientRequestHandler as DELETE,
};

const clientRequestHandler = async (req: NextRequest, { params: { __endpoint } }: RequestInfo) => {
  let url = __endpoint.join('/');
  let payload;
  let searchParams = req.nextUrl.searchParams.toString() || undefined;
  if (req.method === 'POST' || (req.method === 'PUT' && req.headers.get('Content-Length') !== '0')) {
    const isJson = req.headers.get('Content-Type')?.includes('json');
    payload = await (isJson ? req.json() : req.formData());
  }
  try {
    const data = await serverApi({
      url,
      method: req.method as TApiOptions['method'],
      data: payload,
      searchParams,
    });
    return NextResponse.json(data ?? null);
  } catch (err: any) {
    const { statusCode, body } = getErrorData(err);
    return NextResponse.json(body, { status: statusCode });
  }
};
