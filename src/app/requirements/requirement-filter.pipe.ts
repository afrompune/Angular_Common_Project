import { Pipe, PipeTransform } from '@angular/core';
import { Requirement } from './requirements.service';

@Pipe({
  name: 'filterRequirements',
  pure : false
})
export class RequirementFilterPipe implements PipeTransform {

  transform(value: Requirement[], pattarn: string) {

    if (value.length === 0) {
      return value;
    }

    return value.filter(s => s.skill.asString.search(pattarn) != 0 );

  }
}
