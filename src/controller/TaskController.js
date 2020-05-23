const TaskModel = require('../model/TaskModel');
const { 
    startOfDay, 
    endOfDay, 
    startOfWeek, 
    endOfWeek,
    startOfMonth,
    endOfMonth,
    startOfYear,
    endOfYear,
} = require('date-fns');

const HTTP_STATUS_OK = 200;
const HTTP_STATUS_INTERNAL_ERROR = 500;
const HTTP_STATUS_NOT_FOUND = 404;

const currentDate = new Date();

class TaskController {
    async create(req, res){
        const task = new TaskModel(req.body);
        await task
              .save()
              .then(response => {
                  return res.status(HTTP_STATUS_OK).json(response);
              })
              .catch(error => {
                  return res.status(HTTP_STATUS_INTERNAL_ERROR).json(error);
              });
    }

    async update(req, res){
        await TaskModel
        .findByIdAndUpdate(
            {'_id': req.params.id},
            req.body,
            { new: true },
        )
        .then(response => {
            return res.status(HTTP_STATUS_OK).json(response);
        })
        .catch(error => {
            return res.status(HTTP_STATUS_INTERNAL_ERROR).json(error);
        })
    }

    async all(req, res){
        await TaskModel
        .find({ macaddress: { '$in': req.params.macaddress } })
        .sort('when')
        .then(response => {
            return res.status(HTTP_STATUS_OK).json(response);
        })
        .catch(error => {
            return res.status(HTTP_STATUS_INTERNAL_ERROR).json(error);
        })
    }

    async show(req, res){
        await TaskModel
        .findById(req.params.id)
        .then(response => {
            if (response) {
                return res.status(HTTP_STATUS_OK).json(response);
            }
            return res.status(HTTP_STATUS_NOT_FOUND).json({error: "Tarefa nao encontrada"});
        })
        .catch(error => {
            return res.status(HTTP_STATUS_INTERNAL_ERROR).json(error);
        })
    }

    async delete(req, res){
        await TaskModel
        .deleteOne({'_id': req.params.id})
        .then(response => {
            if (response) {
                return res.status(HTTP_STATUS_OK).json(response);
            }
            return res.status(HTTP_STATUS_NOT_FOUND).json({error: "Tarefa nao encontrada para deletar"});
        })
        .catch(error => {
            return res.status(HTTP_STATUS_INTERNAL_ERROR).json(error);
        })
    }

    async done(req, res){
        await TaskModel
        .findByIdAndUpdate(
            {'_id': req.params.id},
            {'done': req.params.done},
            {new: true},
        )
        .then(response => {
            return res.status(HTTP_STATUS_OK).json(response);
        })
        .catch(error => {
            return res.status(HTTP_STATUS_INTERNAL_ERROR).json(error);
        });
    }

    async late(req, res){
        await TaskModel
        .find(
            {'when': {'$lt': currentDate},
            'macaddress': {'$in': req.params.macaddress},
            'done': false,
        })
        .sort('when')
        .then(response => {
            return res.status(HTTP_STATUS_OK).json(response);
        })
        .catch(error => {
            return res.status(HTTP_STATUS_INTERNAL_ERROR).json(error);
        });
    }

    async today(req, res){
        await TaskModel
        .find({
            'macaddress': {'$in': req.params.macaddress},
            'when': {
                '$gte': startOfDay(currentDate),
                '$lte': endOfDay(currentDate),
            },
        })
        .sort('when')
        .then(response => {
            return res.status(HTTP_STATUS_OK).json(response);
        })
        .catch(error => {
            return res.status(HTTP_STATUS_INTERNAL_ERROR).json(error);
        });
    }

    async week(req, res){
        await TaskModel
        .find({
            'macaddress': {'$in': req.params.macaddress},
            'when': {
                '$gte': startOfWeek(currentDate),
                '$lte': endOfWeek(currentDate),
            },
        })
        .sort('when')
        .then(response => {
            return res.status(HTTP_STATUS_OK).json(response);
        })
        .catch(error => {
            return res.status(HTTP_STATUS_INTERNAL_ERROR).json(error);
        });
    }

    async month(req, res){
        await TaskModel
        .find({
            'macaddress': {'$in': req.params.macaddress},
            'when': {
                '$gte': startOfMonth(currentDate),
                '$lte': endOfMonth(currentDate),
            },
        })
        .sort('when')
        .then(response => {
            return res.status(HTTP_STATUS_OK).json(response);
        })
        .catch(error => {
            return res.status(HTTP_STATUS_INTERNAL_ERROR).json(error);
        });
    }

    async year(req, res){
        await TaskModel
        .find({
            'macaddress': {'$in': req.params.macaddress},
            'when': {
                '$gte': startOfYear(currentDate),
                '$lte': endOfYear(currentDate),
            },
        })
        .sort('when')
        .then(response => {
            return res.status(HTTP_STATUS_OK).json(response);
        })
        .catch(error => {
            return res.status(HTTP_STATUS_INTERNAL_ERROR).json(error);
        });
    }
    
}

module.exports = new TaskController();