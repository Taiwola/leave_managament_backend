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
Object.defineProperty(exports, "__esModule", { value: true });
exports.User_Entitled_Leave = exports.Entitled_Leave = exports.Relieving_officer = exports.Department = exports.Leave = exports.Approval_type = exports.Type = exports.Status = void 0;
var typeorm_1 = require("typeorm");
var user_1 = require("./user");
var Status;
(function (Status) {
    Status["pending"] = "PENDING";
    Status["approved"] = "approved";
    Status["reject"] = "reject";
})(Status || (exports.Status = Status = {}));
var Type;
(function (Type) {
    Type["annual leave"] = "annual leave";
    Type["vacation"] = "vacation";
    Type["sick leave"] = "sick leave";
    Type["maternity leave"] = "maternity leave";
})(Type || (exports.Type = Type = {}));
var Approval_type;
(function (Approval_type) {
    Approval_type["reviewed"] = "reviewed";
    Approval_type["to be reviewed"] = "to be reviewed";
    Approval_type["rejected"] = "rejected";
})(Approval_type || (exports.Approval_type = Approval_type = {}));
var Leave = /** @class */ (function () {
    function Leave() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
        __metadata("design:type", String)
    ], Leave.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar", length: 255, nullable: false }),
        __metadata("design:type", String)
    ], Leave.prototype, "title", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar", length: 255, nullable: false }),
        __metadata("design:type", String)
    ], Leave.prototype, "description", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar", length: 255, nullable: false }),
        __metadata("design:type", String)
    ], Leave.prototype, "number_of_days", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar", length: 255, nullable: false }),
        __metadata("design:type", String)
    ], Leave.prototype, "start_date", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar", length: 255, nullable: false }),
        __metadata("design:type", String)
    ], Leave.prototype, "end_date", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar", length: 255, nullable: false }),
        __metadata("design:type", String)
    ], Leave.prototype, "resumptionDate", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "enum", enum: Approval_type, nullable: true, default: Approval_type["to be reviewed"] }),
        __metadata("design:type", String)
    ], Leave.prototype, "departmental_approval", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "enum", enum: Approval_type, nullable: true, default: Approval_type["to be reviewed"] }),
        __metadata("design:type", String)
    ], Leave.prototype, "operation_management_approval", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "enum", enum: Status, default: Status.pending }),
        __metadata("design:type", String)
    ], Leave.prototype, "status", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar", length: 500, nullable: true }),
        __metadata("design:type", String)
    ], Leave.prototype, "comment", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar", length: 500, nullable: true }),
        __metadata("design:type", String)
    ], Leave.prototype, "cover_letter", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "enum", enum: Type, nullable: true }),
        __metadata("design:type", String)
    ], Leave.prototype, "leave_type", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return user_1.User; }, function (user) { return user.leave; }),
        __metadata("design:type", user_1.User)
    ], Leave.prototype, "user", void 0);
    __decorate([
        (0, typeorm_1.OneToOne)(function () { return Relieving_officer; }, function (relieving_officer) { return relieving_officer.relieve_leave; }),
        (0, typeorm_1.JoinColumn)(),
        __metadata("design:type", Relieving_officer)
    ], Leave.prototype, "relieving_officer", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)({
            type: "timestamp",
            default: function () { return "CURRENT_TIMESTAMP"; },
            name: "created_at",
        }),
        __metadata("design:type", Date)
    ], Leave.prototype, "createdAt", void 0);
    Leave = __decorate([
        (0, typeorm_1.Entity)({ name: 'leave' })
    ], Leave);
    return Leave;
}());
exports.Leave = Leave;
var Department = /** @class */ (function () {
    function Department() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
        __metadata("design:type", String)
    ], Department.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar", nullable: false }),
        __metadata("design:type", String)
    ], Department.prototype, "name", void 0);
    __decorate([
        (0, typeorm_1.OneToOne)(function () { return user_1.User; }, function (user) { return user.directorOf; }, { nullable: true }) // Assuming a department may not have a director
        ,
        (0, typeorm_1.JoinColumn)(),
        __metadata("design:type", user_1.User)
    ], Department.prototype, "director", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return user_1.User; }, function (user) { return user.staff; }, { nullable: true }),
        (0, typeorm_1.JoinColumn)(),
        __metadata("design:type", Array)
    ], Department.prototype, "staff", void 0);
    Department = __decorate([
        (0, typeorm_1.Entity)({ name: 'department' })
    ], Department);
    return Department;
}());
exports.Department = Department;
var Relieving_officer = /** @class */ (function () {
    function Relieving_officer() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
        __metadata("design:type", String)
    ], Relieving_officer.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'boolean', default: false }),
        __metadata("design:type", Boolean)
    ], Relieving_officer.prototype, "is_viewed", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "boolean", nullable: true }),
        __metadata("design:type", Boolean)
    ], Relieving_officer.prototype, "accept_relieve", void 0);
    __decorate([
        (0, typeorm_1.OneToOne)(function () { return Leave; }, function (leave) { return leave.relieving_officer; }),
        (0, typeorm_1.JoinColumn)(),
        __metadata("design:type", Leave // one to one
        )
    ], Relieving_officer.prototype, "relieve_leave", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return user_1.User; }, function (user) { return user.relieving_officer; }),
        __metadata("design:type", user_1.User // many to one
        )
    ], Relieving_officer.prototype, "relieving_officer", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return user_1.User; }, function (user) { return user.requesting_officer; }),
        __metadata("design:type", user_1.User // many to one
        )
    ], Relieving_officer.prototype, "requesting_officer", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar", nullable: true, length: 255 }),
        __metadata("design:type", String)
    ], Relieving_officer.prototype, "acceptance_date", void 0);
    Relieving_officer = __decorate([
        (0, typeorm_1.Entity)({ name: 'relieving_officer' })
    ], Relieving_officer);
    return Relieving_officer;
}());
exports.Relieving_officer = Relieving_officer;
var Entitled_Leave = /** @class */ (function () {
    function Entitled_Leave() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
        __metadata("design:type", String)
    ], Entitled_Leave.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "int", nullable: false }),
        __metadata("design:type", Number)
    ], Entitled_Leave.prototype, "gradeLevel", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "int", nullable: false }),
        __metadata("design:type", Number)
    ], Entitled_Leave.prototype, "numberOfDays", void 0);
    Entitled_Leave = __decorate([
        (0, typeorm_1.Entity)({ name: "entitled leave" })
    ], Entitled_Leave);
    return Entitled_Leave;
}());
exports.Entitled_Leave = Entitled_Leave;
var User_Entitled_Leave = /** @class */ (function () {
    function User_Entitled_Leave() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
        __metadata("design:type", String)
    ], User_Entitled_Leave.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "text", nullable: true }),
        __metadata("design:type", String)
    ], User_Entitled_Leave.prototype, "userId", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "int", nullable: false }),
        __metadata("design:type", Number)
    ], User_Entitled_Leave.prototype, "currentYear", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "int", nullable: true }),
        __metadata("design:type", Number)
    ], User_Entitled_Leave.prototype, "gradeLevel", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "int", nullable: false }),
        __metadata("design:type", Number)
    ], User_Entitled_Leave.prototype, "numberOfDays", void 0);
    __decorate([
        (0, typeorm_1.OneToOne)(function () { return user_1.User; }, function (user) { return user.entitledLeave; }),
        (0, typeorm_1.JoinColumn)(),
        __metadata("design:type", user_1.User)
    ], User_Entitled_Leave.prototype, "user", void 0);
    User_Entitled_Leave = __decorate([
        (0, typeorm_1.Entity)({ name: "user entitled leave" })
    ], User_Entitled_Leave);
    return User_Entitled_Leave;
}());
exports.User_Entitled_Leave = User_Entitled_Leave;
//# sourceMappingURL=entity.js.map