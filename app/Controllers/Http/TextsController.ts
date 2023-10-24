import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Text from 'App/Models/Text'

export default class TextsController {
    public async index ({view}:HttpContextContract){
        let texts = await Text.all()
        return view.render('text/index.edge', {texts})
    }

    public async show ({params, view}:HttpContextContract){
        let text = await Text.query().where('id', params.id).firstOrFail()
        return view.render('text/show.edge', {text})
    }

    public async create ({view}:HttpContextContract){
        return view.render('text/create.edge')
    }

    public async store ({request, response}:HttpContextContract){
        const data = request.only(['content'])
        await Text.create(data)
        response.redirect().toRoute('text.index')
    }

    public async edit ({params, view}:HttpContextContract){
        const text = await Text.findOrFail(params.id)
        return view.render('text/edit.edge', {text})
    }

    public async update ({params, request, response}:HttpContextContract){
        const text = await Text.findOrFail(params.id)
        await text.merge({
            content: request.only(['content']).content
        }).save()
        response.redirect().toRoute('text.index')
    }

    public async destroy ({params, response}: HttpContextContract){

        const text = await Text.findOrFail(params.id)
        await text.delete()
        response.redirect().toRoute('text.index')
    }
}
