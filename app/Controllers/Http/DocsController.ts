import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Doc from 'App/Models/Doc'
import { DateTime } from 'luxon'

export default class DocsController {
    public async index ({view}:HttpContextContract){
        let docs = await Doc.query().preload('codes').preload('texts').orderBy('order', 'asc')
        return view.render('doc/index.edge', {docs})
    }

    public async show ({view, params}:HttpContextContract){
        let doc = await Doc.query().preload('codes').preload('texts').where('id', params.id).firstOrFail()
        console.log(doc.related('codes'))
        return view.render('doc/show.edge', {doc})
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
