"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskController = void 0;
const runtime_1 = require("@tsoa/runtime");
const zod_1 = require("zod");
const validation_decorators_1 = require("./validation.decorators");
// Define Zod schema for Task parameters
const TaskCreateSchema = zod_1.z.object({
    title: zod_1.z.string().min(5, "Title must be at least 5 letters long"),
    completed: zod_1.z.boolean(),
    priority: zod_1.z.number()
        .min(1, 'Priority must be greater or equal to 1')
        .max(5, 'Priority must be lower or equal to 5')
});
let TaskController = class TaskController extends runtime_1.Controller {
    createTask(task) {
        return __awaiter(this, void 0, void 0, function* () {
            // this is no longer needed
            /*
               const check = TaskSchema.safeParse(task);
               if(!check.success){
                 return BaseError.createInvalidArgumentError(check.error.errors.join(','))
               }
            */
            return Object.assign({ id: '1' }, task);
        });
    }
};
exports.TaskController = TaskController;
__decorate([
    (0, runtime_1.Post)(""),
    (0, runtime_1.SuccessResponse)('201', 'Task Created'),
    (0, validation_decorators_1.ValidateBody)(TaskCreateSchema) // <-- New Decorator
    ,
    __param(0, (0, validation_decorators_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "createTask", null);
exports.TaskController = TaskController = __decorate([
    (0, runtime_1.Route)("tasks"),
    (0, runtime_1.Tags)("Tasks")
], TaskController);
//# sourceMappingURL=task.controller.js.map