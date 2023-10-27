import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Doc from 'App/Models/Doc'
import Element from 'App/Models/Element'
import Text from 'App/Models/Text'
import Code from 'App/Models/Code'
import { DateTime } from 'luxon'

export default class DocsController {
    public async index ({view}:HttpContextContract){
        let docs = await Doc.query().preload('elements').orderBy('order', 'asc')
        return view.render('doc/index.edge', {docs})
    }

    public async show ({view, params}:HttpContextContract){
        let doc = await Doc.query().preload('elements').where('id', params.id).firstOrFail()
        let texts: Text[] = await Text.query().preload('doc').where('doc_id', params.id).orderBy('order', 'asc')
        let codes: Code[] = await Code.query().preload('doc').where('doc_id', params.id).orderBy('order', 'asc')
        let elements: Element[] = texts.concat(codes)
        elements.sort((a, b) => a.order.valueOf() - b.order.valueOf());
        return view.render('doc/show.edge', {doc, elements})
    }

    public async create ({view}:HttpContextContract){
        return view.render('doc/create.edge')
    }

    public async store ({request, response}:HttpContextContract){
        const data = request.only(['title'])
        
        await Doc.create(data)
        response.redirect().toRoute('doc.index')
    }

    public async edit ({params, view}:HttpContextContract){
        const doc = await Doc.findOrFail(params.id)
        return view.render('doc/edit.edge', {doc})
    }

    public async update ({params, request, response}:HttpContextContract){
        const doc = await Doc.findOrFail(params.id)
        await doc.merge({
            title: request.only(['title']).title
        }).save()
        response.redirect().toRoute('doc.index')
    }

    public async destroy ({params, response}: HttpContextContract){
        const doc = await Doc.findOrFail(params.id)
        await doc.delete()
        response.redirect().toRoute('doc.index')
    }

    public async down ({params, response}: HttpContextContract){
        const doc = await Doc.findOrFail(params.id)
        await doc.merge({order: DateTime.local()}).save()
        response.redirect().toRoute('doc.index')
    }
}
