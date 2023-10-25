import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Code from 'App/Models/Code'
import Result from 'App/Models/Result'
import Doc from 'App/Models/Doc'
import { DateTime } from 'luxon'

export default class CodesController {
    public async index ({view}:HttpContextContract){
        let codes = await Code.query().preload('result').preload('doc').orderBy('order', 'asc')
        return view.render('code/index.edge', {codes})
    }

    public async show ({params, view}:HttpContextContract){
        let code = await Code.query().preload('result').preload('doc').where('id', params.id).firstOrFail()
        let codeToHtml = code.code.split('&').join('&amp;').split('<').join('&lt;')
        let resultLines: string[] = []
        if(code.result !=null){
            resultLines = code.result.result.split('\r\n')
        }
        return view.render('code/show.edge', {code, codeToHtml, resultLines})
    }

    public async create ({view}:HttpContextContract){
        const resultTypeOptions: string[] = ['result', 'console']
        const docs = await Doc.all()
        return view.render('code/create.edge', {resultTypeOptions, docs})
    }

    public async store ({request, response}:HttpContextContract){
        const data = request.only(['code', 'language', 'docId'])
        let code = await Code.create(data)

        if(request.only(['result']).result != null){
            let resultData = request.only(['result', 'type'])
            resultData['codeId'] = code.id
            await Result.create(resultData)
        }
        response.redirect().toRoute('code.index')
    }

    public async edit ({params, view}:HttpContextContract){
        //const code = (await Code.findOrFail(params.id))
        const resultTypeOptions: string[] = ['result', 'console']
        const docs = await Doc.all()
        const code = await Code.query().preload('result').preload('doc').where('id', params.id).firstOrFail()
        return view.render('code/edit.edge', {code, resultTypeOptions, docs})
    }

    public async update ({params, request, response}:HttpContextContract){
        const code = await Code.query().preload('result').where('id', params.id).firstOrFail()
        await code.merge({
            code: request.only(['code']).code,
            language: request.only(['language']).language,
            docId: request.only(['docId']).docId
        }).save()

        if (code.result != null){
            await code.result.merge({
                result: request.only(['result']).result,
                type: request.only(['type']).type
            }).save()
        } else {
            if (request.only(['result']).result != null){
                let resultData = request.only(['result', 'type'])
                resultData['codeId'] = code.id
                await Result.create(resultData)
            }
        }
        response.redirect().toRoute('code.index')
    }

    public async destroy ({params, response}: HttpContextContract){

        const code = await Code.findOrFail(params.id)
        await code.delete()
        response.redirect().toRoute('code.index')
    }

    public async down ({params, response}: HttpContextContract){
        const code = await Code.findOrFail(params.id)
        await code.merge({order: DateTime.local()}).save()
        response.redirect().toRoute('code.index')
    }
}
