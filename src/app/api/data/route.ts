import { NextResponse } from 'next/server';

export async function GET() {

//   const response = await fetch('https://staging.mazaady.com/api/v1/get_all_cats', {
//     headers: {
//       'private-key': process.env.API_PRIVATE_KEY
//     }
//   });

  console.log(process.env.API_PRIVATE_KEY)

  // const data = await res.json();
  return NextResponse.json({ "data" : "data" })
}

// export async function GET(request: Request) {

//   const response = await fetch('https://staging.mazaady.com/api/v1/get_all_cats', {
//     headers: {
//       'private-key': process.env.API_PRIVATE_KEY
//     }
//   });

//   return newNextResponse.json('Hello, Next.js!')
// }
