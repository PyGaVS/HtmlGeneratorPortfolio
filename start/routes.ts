/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', 'DocsController.index').as('dashboard')

//Docs
Route.group(() => {
  Route.get('/', 'DocsController.index').as('doc.index')

  Route.get('/create', 'DocsController.create').as('doc.create')
  
  Route.post('/', 'DocsController.store').as('doc.store')
  
  Route.delete('/:id', 'DocsController.destroy').as('doc.delete')

  Route.get('/:id', 'DocsController.edit').as('doc.edit')

  Route.put('/:id', 'DocsController.update').as('doc.update')
}).prefix('/doc')

//Texts
Route.group(() => {
  Route.get('/', 'TextsController.index').as('text.index')

  Route.get('/create', 'TextsController.create').as('text.create')
  
  Route.post('/', 'TextsController.store').as('text.store')
  
  Route.delete('/:id', 'TextsController.destroy').as('text.delete')

  Route.get('/:id', 'TextsController.edit').as('text.edit')

  Route.put('/:id', 'TextsController.update').as('text.update')
}).prefix('/text')

//Codes
Route.group(() => {
  Route.get('/', 'CodesController.index').as('code.index')

  Route.get('/create', 'CodesController.create').as('code.create')
  
  Route.post('/', 'CodesController.store').as('code.store')
  
  Route.delete('/:id', 'CodesController.destroy').as('code.delete')

  Route.get('/:id/edit', 'CodesController.edit').as('code.edit')

  Route.put('/:id', 'CodesController.update').as('code.update')

  Route.get('/:id', 'CodesController.show').as('code.show')
}).prefix('/code')


//Route.resource('/doc', 'DocsController').as('doc')
