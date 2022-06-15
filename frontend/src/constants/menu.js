// import { NavLink } from "react-router-dom";
import { adminRoot } from './defaultValues';

const data = [
  {
    id: 'user',
    icon: 'iconsminds-air-balloon-1',
    label: 'menu.gogo',
    to: `${adminRoot}/user`,
    subs: [
      {
        icon: 'simple-icon-paper-plane',
        label: 'AddUser',
        to: `${adminRoot}/user/add`,
      },  
      {
        icon: 'simple-icon-paper-plane',
        label: 'ListUser',
        to: `${adminRoot}/user/list`,
      },
    ],
  },
  {
    id: 'company',
    icon: 'iconsminds-three-arrow-fork',
    label: 'menu.second-menu',
    to: `${adminRoot}/company`,
    // roles: [UserRole.Admin, UserRole.Editor],
    subs: [
      {
        icon: 'simple-icon-paper-plane',
        label: 'AddCompany',
        to: `${adminRoot}/company/add`,
      },
      {
        icon: 'simple-icon-paper-plane',
        label: 'ListCompany',
        to: `${adminRoot}/company/list`,
      },
    ],
  },
  {
    id: 'blankpage',
    icon: 'iconsminds-bucket',
    label: 'menu.blank-page',
    to: `${adminRoot}/blank-page`,
  },
  {
    id: 'docs',
    icon: 'iconsminds-library',
    label: 'menu.docs',
    to: 'https://gogo-react-docs.coloredstrategies.com/',
    newWindow: true,
  },
];
export default data;
