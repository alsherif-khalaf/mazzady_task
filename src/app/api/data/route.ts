import { NextResponse } from 'next/server';
import { getSubCategoryProperties , getOptionsChild} from '../../../../utils/data';

export async function GET(request: Request) {

    const { searchParams } = new URL(request.url);

    const categoryId= searchParams.get('categoryId');
    const brandlId= searchParams.get('brandId');

    console.log("from route.ts", categoryId, brandlId , searchParams)

    if(categoryId) {
        const Id = parseInt(categoryId);
        const res = await getSubCategoryProperties(Id)
        return NextResponse.json({ res })
    }

    if(brandlId) {
        const Id = parseInt(brandlId);
        const res = await getOptionsChild(Id)
        return NextResponse.json({ res })
    }

    return NextResponse.json({ res: [] })
}
