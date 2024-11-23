"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DemoProtectedRouteModule = void 0;
const common_1 = require("@nestjs/common");
const demo_protected_route_service_1 = require("./demo-protected-route.service");
const demo_protected_route_controller_1 = require("./demo-protected-route.controller");
let DemoProtectedRouteModule = class DemoProtectedRouteModule {
};
exports.DemoProtectedRouteModule = DemoProtectedRouteModule;
exports.DemoProtectedRouteModule = DemoProtectedRouteModule = __decorate([
    (0, common_1.Module)({
        providers: [demo_protected_route_service_1.DemoProtectedRouteService],
        controllers: [demo_protected_route_controller_1.DemoProtectedRouteController]
    })
], DemoProtectedRouteModule);
//# sourceMappingURL=demo-protected-route.module.js.map