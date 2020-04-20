import { Pipe, PipeTransform } from '@angular/core';
import { Profile } from '../profiles/profiles.service';
import { UserDetails } from '../user/user-details.model';
import { UserDetailsService } from '../user/user-detail.service';

@Pipe({
  name: 'filterListValues',
  //pure : false causes filter to be reapplied when any data changes. Will have performance issues.
  //pure: false
  pure: true
})
export class FilterListValuesPipe implements PipeTransform {

  transform(value: string[] | Profile[] | UserDetails[], dataType: string, _pattarn: string) {

    const pattarn = _pattarn.toUpperCase();

    if (value.length === 0) {
      return value;
    }

    console.log(dataType);

    if (dataType === "Profile") {
      return (<Profile[]>value).filter(s => (s.name + s.contactNumber).toUpperCase().search(pattarn) >= 0);
    }

    if (dataType === "UserDetail") {
      return (<UserDetails[]>value).filter(s => (s.user_name).toUpperCase().search(pattarn) >= 0);
    }

    return value;
  }
}
