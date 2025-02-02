/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("qgold64cchgs83x")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "dhreijaa",
    "name": "parent",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "qgold64cchgs83x",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("qgold64cchgs83x")

  // remove
  collection.schema.removeField("dhreijaa")

  return dao.saveCollection(collection)
})
