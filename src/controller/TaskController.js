const TaskModel = require('../model/TaskModel');

const HTTP_STATUS_OK = 200;
const HTTP_STATUS_INTERNAL_ERROR = 500;

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
        await TaskModel.findByIdAndUpdate(
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
}

module.exports = new TaskController();