
// import fs from 'fs';
// import path from 'path';
// import { v4 as uuidv4 } from 'uuid';
// import formidable from 'formidable';
// import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
// import { NextRequest, NextResponse } from 'next/server';

// // Ensure the `api` folder has a configuration to disable body parsing for this route
// export const config = {
//     api: {
//         bodyParser: false,
//     },
// };

// const readFile = (req: NextApiRequest, saveLocally?: boolean)
//     : Promise<{ fields: formidable.Fields; files: formidable.Files }> => {
//     const options: formidable.Options = {};
//     if (saveLocally) {
//         options.uploadDir = path.join(process.cwd(), 'public/uploads');
//         options.filename = (name, ext, path, form) => {
//             return Date.now().toString() + "_" + path.originalFilename;
//         }
//     }
//     const form = formidable(options);
//     return new Promise((resolve, reject) => {
//         form.parse(req, (err, fields, files) => {
//             if (err) reject(err);
//             resolve({ fields, files });
//         })
//     })
// }

// export const POST = async (req: NextApiRequest, res: NextApiResponse) => {
//     if (req.method !== 'POST') {
//         return res.status(405).json({ message: 'Method not allowed' })
//     }
//     try {
//         console.log("1")
//         await fs.promises.readdir(path.join(process.cwd() + "/public", "/images"), { recursive: true })
//     } catch (error) {
//         await fs.promises.mkdir(path.join(process.cwd() + "/public", "/images"), { recursive: true })
//     }
//     const { files } = await readFile(req, true);
//     if (files) {
//         return res.status(200).json({ message: "Uploaded Successfully", success: true });

//     } else {
//         return res.status(500).json({ message: "No file uploaded", success: false });
//     }
// }

// export async function POST(req: NextApiRequest) {
//     console.log("1")
//     try {
//         console.log("1")
//         await fs.promises.readdir(path.join(process.cwd() + "/public", "/images"), { recursive: true })
//     } catch (error) {
//         await fs.promises.mkdir(path.join(process.cwd() + "/public", "/images"), { recursive: true })
//     }
//     await readFile(req, true);
//     // res.status(200).json({ message: "success" })
//     return NextResponse.json({message:"Uploaded succesfully",success:true},{status:200});
// }
// const handler: NextApiHandler = async (req, res)=>{
//     if(req.method!=='POST'){
//         return res.status(405).json({message:'Method not allowed'})
//     }
//     console.log("1")
//     try {
//         console.log("1")
//         await fs.promises.readdir(path.join(process.cwd() + "/public", "/images"), { recursive: true })
//     } catch (error) {
//         await fs.promises.mkdir(path.join(process.cwd() + "/public", "/images"), { recursive: true })
//     }
//     await readFile(req,true);
//      return res.status(200).json({message:"success"})
// };

// export default handler

