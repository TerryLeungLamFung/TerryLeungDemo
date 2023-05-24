import {FriendList} from './friendLocatorType';

export const friendList: FriendList = {
  friends: [
    {
      name: 'Lik Hui',
      tel: '+1 (473) 681-7332',
      address: '36 Vaughan Rd, Toronto, ON',
      favFood: ['chicken', 'noodle'],
      instagram: 'Huilik',
      facebook: 'HuiLik',
      linkedin: 'www.linkedin',
      email: 'huilik@gmail.com',
      geoLocation: {
        latitude: 43.6842121,
        longitude: -79.4175732,
      },
    },
    {
      name: 'Tim Leung',
      tel: '+1 (365) 403-8986',
      address: '549 Sammon Ave, East York, ON',
      favFood: ['chicken', 'noodle'],
      instagram: '_timLeung_',
      facebook: 'Tim Leung Fung',
      linkedin: 'www.linkedin.com/leungcycyTim',
      email: 'cytimeleung@hotmail.com',
      geoLocation: {
        latitude: 43.6902382,
        longitude: -79.32921715,
      },
    },
    {
      name: 'Brian Meachle',
      tel: '+1 (423) 877-5631',
      address: '252 Queen St E, Toronto, ON',
      favFood: ['chicken', 'noodle'],
      instagram: 'MechllBrianGo',
      facebook: 'Brian Meachle',
      linkedin: 'www.linkedin.com/Briaclle',
      email: 'bianmeecle@hotmail.com',
      geoLocation: {
        latitude: 43.659008,
        longitude: -79.3701475,
      },
    },
    {
      name: 'Beth Felship',
      tel: '+1 (493) 098-1886',
      address: '135 Glendale Ave, Toronto, ON',
      favFood: ['chicken', 'noodle'],
      instagram: 'Betheslship',
      facebook: 'Beth Felship',
      linkedin: 'www.linkedin.com/Bethship1999',
      email: 'bethhllship@hotmail.com',
      geoLocation: {
        latitude: 43.6434419,
        longitude: -79.451113,
      },
    },
    {
      name: 'Ricky Yiu',
      tel: '+1 (493) 018-1596',
      address: '171 E Liberty St 100, Toronto, ON',
      favFood: ['chicken', 'noodle'],
      instagram: 'Rickyyu',
      facebook: 'Ricky Yiu',
      linkedin: 'www.linkedin.com/Richhyhyiu',
      email: 'Richhyhyiu@hotmail.com',
      geoLocation: {
        latitude: 43.6370776,
        longitude: -79.4248227,
      },
    },
  ],
};
export const ppIcon = (name: string) => {
  if (name.includes('Lik Hui')) {
    return require('../../../assets/images/demo/Bigger/pp01.jpeg');
  } else if (name.includes('Tim Leung')) {
    return require('../../../assets/images/demo/Bigger/pp02.jpeg');
  } else if (name.includes('Brian Meachle')) {
    return require('../../../assets/images/demo/Bigger/pp03.jpeg');
  } else if (name.includes('Beth Felship')) {
    return require('../../../assets/images/demo/Bigger/pp04.jpeg');
  } else if (name.includes('Ricky Yiu')) {
    return require('../../../assets/images/demo/Bigger/pp05.jpeg');
  } else {
    return require('../../../assets/images/demo/defaultIcon.jpg');
  }
};
