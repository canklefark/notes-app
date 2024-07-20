/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("2jugvv2kapyipyz")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "d55z1exh",
    "name": "created_at",
    "type": "date",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": "",
      "max": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("2jugvv2kapyipyz")

  // remove
  collection.schema.removeField("d55z1exh")

  return dao.saveCollection(collection)
})
