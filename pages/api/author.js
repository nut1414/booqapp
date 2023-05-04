import {verify} from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

export default async function Author(req,res){
    if(req.method == "POST"){
        // This required name(AuthorName) id(AuthorID)(Optional) 
        req.body.name = req.body.name.toLowerCase()
        const iscreated = await prisma.author.findUnique({
            where: {
                AuthorName: req.body.name
            }
        })
        if(!iscreated){
            const createauthor = await prisma.author.create({
                data: {
                    AuthorName: req.body.name,
                    AuthorID: req.body?.id ? parseInt(req.body?.id,10) : undefined,
                }
            })
            res.status(200).json({message: "Author Created"})
        }else{
            res.status(400).json({message: "Author Already Created"})
        }
    }
    else if(req.method == "GET"){
        let getauthor = []
        if(req.query.name){
            req.query.name = req.query.name.toLowerCase()
            getauthor = await prisma.author.findMany({
                where: {
                    AuthorName: req.query.name
                }
            })
        }
        else{
            getauthor = await prisma.author.findMany({
                where: {
                    NOT: [{
                        AuthorName: ""
                    }]
                }
            })
        }        
        res.status(200).json({author : getauthor})
    }
    else if(req.method == "DELETE"){ // Query not body
        console.log(req.query)
        req.query.name = req.query.name.toLowerCase()
        if(req.query?.id || req.query?.name){
            const deleteauthor = await prisma.author.delete({
                where: {
                    AuthorID: req.query?.id ? parseInt(req.query?.id,10) : undefined,
                    AuthorName: req.query?.name ? req.query?.name : undefined
                }
            }).then(() => {
                res.status(200).json({message: "Author Deleted"})
            })
            .catch((err) => {
                console.log(err)
                res.status(404).json({message: "Author Doesn't Exist"})
            })
        }
        else{
            res.status(400).json({message: "No Input"})
        }
    }
    await prisma.$disconnect()
    return res
}