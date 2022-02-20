import base from './base';
import utils from '../utils/utils';
export default class Project{
    static saveProject(project:any){
        base.setSync('owenProject', JSON.stringify(project));
    }
    static getProject():any{
        const value=base.getSync('owenProject')
        if(utils.isNotEmpty(value)){
            return JSON.parse(value)
        }
        return {}; 
    }
    static getOwenProjectId():string{
        const owenProject=Project.getProject()
        let projectId=""
        if(owenProject&&owenProject.projectItem&&utils.isNotEmpty(owenProject.projectItem.id)){
            projectId=owenProject.projectItem.id
        }
        return projectId
    }
    static clear(){
        base.removeSync('owenProject');
    }
}