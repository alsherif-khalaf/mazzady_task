import { NextResponse } from 'next/server';
import { getSubCategoryProperties } from '../../../../utils/data';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if(id) {
        const Id = parseInt(id);
        const res = await getSubCategoryProperties(Id)
        return NextResponse.json({ res })
    } else {
        return NextResponse.json({ data: [] })
    }
}
