"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateItemInList = exports.deleteItemFromList = exports.addItemToList = exports.updateList = exports.addList = exports.listLists = void 0;
const staticLists = [
    {
        id: 'l-1',
        description: 'Dev tasks',
        items: [{
                "id": "item-1",
                "description": "finish the workshop",
                "state": "PENDING"
            },],
    },
    {
        id: 'l-2',
        description: 'Dev tasks2',
        items: [{ "id": "item-2",
                "description": "send the work to the professor",
                "state": "IN-PROGRESS" }]
    }
];
const staticItems = [
    {
        id: "item-1",
        description: "finish the workshop",
        state: 'PENDING'
    },
    {
        id: "item-2",
        description: "send the work to the professor",
        state: "IN-PROGRESS"
    }
];
const listLists = async (request, reply) => {
    Promise.resolve(staticLists)
        .then((item) => {
        reply.send({ data: item });
    });
};
exports.listLists = listLists;
function getListById(id) {
    return staticLists.find((list) => list.id === id);
}
const addList = async (request, reply) => {
    const { id, description, items } = request.body;
    const existingList = await getListById(id);
    if (existingList) {
        reply.status(409).send({ message: 'This list already exists' });
        return;
    }
    if (!description && items) {
        reply.status(400).send({ message: 'please insert a description for the list you want to add' });
        return;
    }
    else if (description && !items) {
        reply.status(401).send({ message: 'please insert items for the list you want to add' });
        return;
    }
    else if (!description && !items) {
        reply.status(402).send({ message: 'please insert a description and items for the list you want to add' });
        return;
    }
    reply.send({ message: `added list: ${description}` });
};
exports.addList = addList;
const updateList = async (request, reply) => {
    const { id } = request.params;
    const { description } = request.body;
    const list = await getListById(id);
    if (!list) {
        reply.status(404).send({ message: 'this list does not exist in the database.' });
        return;
    }
    if (!description) {
        return reply.status(400).send({ message: 'No new description provided' });
    }
    list.description = description;
    reply.send({ message: `List successfully updated: ${list.description}` });
};
exports.updateList = updateList;
const addItemToList = async (request, reply) => {
    const { id } = request.params;
    const { description, state } = request.body;
    const list = staticLists.find((list) => list.id === id);
    if (!list) {
        reply.status(404).send({ message: 'this list does not exist in the database' });
        return;
    }
    const newItem = {
        id: `item-${Math.random().toString(36).substring(2, 15)}`,
        description,
        state
    };
    list.items.push(newItem);
    reply.status(201).send({ message: 'Item successfully added to the list', item: newItem });
};
exports.addItemToList = addItemToList;
const deleteItemFromList = async (request, reply) => {
    const { id, itemId } = request.params;
    const list = staticLists.find((list) => list.id === id);
    if (!list) {
        reply.status(404).send({ message: 'this list does not exist in the database' });
        return;
    }
    const itemIndex = list.items.findIndex((item) => item.id === itemId);
    if (itemIndex === -1) {
        reply.status(404).send({ message: 'This item does not exist in the list' });
        return;
    }
    list.items.splice(itemIndex, 1);
    reply.status(200).send({ message: 'Item successfully deleted from the list' });
};
exports.deleteItemFromList = deleteItemFromList;
const updateItemInList = async (request, reply) => {
    const { listId, itemId } = request.params;
    const { description, state } = request.body;
    const list = staticLists.find((l) => l.id === listId);
    if (!list) {
        return reply.status(404).send({ message: 'List not found' });
    }
    const item = list.items.find((item) => item.id === itemId);
    if (!item) {
        return reply.status(404).send({ message: 'Item not found' });
    }
    if (description !== undefined)
        item.description = description;
    if (state !== undefined)
        item.state = state;
    reply.status(200).send({ message: 'Item updated successfully', item });
};
exports.updateItemInList = updateItemInList;
//# sourceMappingURL=listsController.js.map