import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Text from 'App/Models/Text'
import Doc from 'App/Models/Doc'
import { DateTime } from 'luxon'

export default class TextsController {
    public async index ({view}:HttpContextContract){
        let texts = await Text.query().preload('doc')
        return view.render('text/index.edge', {texts})
    }

    public async show ({params, view}:HttpContextContract){
        let text = await Text.query().preload('doc').where('id', params.id).firstOrFail()
        return view.render('text/show.edge', {text})
    }

    public async create ({view}:HttpContextContract){
        const docs = await Doc.all()
        return view.render('text/create.edge', {docs})
    }

    public async store ({request, response}:HttpContextContract){
        //request.only(['content']).content = request.only(['content']).content.split('<').join('&lt;')
        const data = request.only(['content', 'docId'])
        await Text.create(data)
        response.redirect().toRoute('text.index')
    }

    public async edit ({params, view}:HttpContextContract){
        const docs = await Doc.all()
        const text = await Text.query().preload('doc').where('id', params.id).firstOrFail()
        return view.render('text/edit.edge', {text, docs})
    }

    public async update ({params, request, response}:HttpContextContract){
        const text = await Text.findOrFail(params.id)
        //request.only(['content']).content = request.only(['content']).content.split('<').join('&lt;')
        await text.merge({
            content: request.only(['content']).content,
            docId: request.only(['docId']).docId
        }).save()
        response.redirect().toRoute('text.index')
    }

    public async destroy ({params, response}: HttpContextContract){

        const text = await Text.findOrFail(params.id)
        await text.delete()
        response.redirect().toRoute('text.index')
    }

    public async down ({params, response}: HttpContextContract){
        const text = await Text.findOrFail(params.id)
        await text.merge({order: DateTime.local()}).save()
        response.redirect().toRoute('doc.show', [text.docId])
    }
}
