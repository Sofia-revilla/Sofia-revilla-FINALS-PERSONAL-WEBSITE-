import { Controller, Get, Post, Body } from '@nestjs/common';
import { ProjectsService } from './projects.service';

@Controller('api')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get('projects')
  getProjects() {
    return this.projectsService.findAll();
  }

  @Post('contact')
  submitContact(@Body() body: any) {
    return this.projectsService.createContact(body);
  }
}