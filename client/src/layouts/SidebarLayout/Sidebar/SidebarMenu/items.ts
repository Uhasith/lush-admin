import { ReactNode } from 'react';
import DonutSmallTwoToneIcon from '@mui/icons-material/DonutSmallTwoTone';
import EngineeringTwoToneIcon from '@mui/icons-material/EngineeringTwoTone';
import GroupAddTwoToneIcon from '@mui/icons-material/GroupAddTwoTone';
import CategoryTwoToneIcon from '@mui/icons-material/CategoryTwoTone';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MmsTwoToneIcon from '@mui/icons-material/MmsTwoTone';
import AgricultureIcon from '@mui/icons-material/Agriculture';
export interface MenuItem {
  link?: string;
  icon?: ReactNode;
  badge?: string;
  items?: MenuItem[];
  name: string;
}

export interface MenuItems {
  items: MenuItem[];
  heading: string;
}

const menuItems = (isAdmin: boolean): MenuItems[] => {
  if (isAdmin) {
    return [
      {
        heading: '',
        items: [
          {
            name: 'Overview',
            icon: DonutSmallTwoToneIcon,
            link: '/app/dashboard'
          }
        ]
      },

      {
        heading: '',
        items: [
          {
            name: 'Active Farmers',
            icon: EngineeringTwoToneIcon,
            link: '/app/workers'
          }
        ]
      },

      {
        heading: '',
        items: [
          {
            name: 'New Applicants',
            icon: GroupAddTwoToneIcon,
            link: '/app/new-applicants'
          }
        ]
      },
      {
        heading: '',
        items: [
          {
            name: 'Messages',
            icon: MmsTwoToneIcon,
            link: '/app/messenger'
          }
        ]
      },
      {
        heading: '',
        items: [
          {
            name: 'Product Categories',
            icon: CategoryTwoToneIcon,
            link: '/app/categories'
          }
        ]
      },
      {
        heading: '',
        items: [
          {
            name: 'Products',
            icon: ShoppingCartIcon,
            link: '/app/products'
          }
        ]
      },
      {
        heading: '',
        items: [
          {
            name: "Farmer's Markets",
            icon: AgricultureIcon,
            link: '/app/farms'
          }
        ]
      }
    ];
  } else {
    return [
      {
        heading: '',
        items: [
          {
            name: 'Overview',
            icon: DonutSmallTwoToneIcon,
            link: '/app/dashboard'
          }
        ]
      },
      {
        heading: '',
        items: [
          {
            name: 'Messages',
            icon: MmsTwoToneIcon,
            link: '/app/messenger'
          }
        ]
      },
      {
        heading: '',
        items: [
          {
            name: 'Product Categories',
            icon: CategoryTwoToneIcon,
            link: '/app/categories'
          }
        ]
      },
      {
        heading: '',
        items: [
          {
            name: 'Products',
            icon: ShoppingCartIcon,
            link: '/app/products'
          }
        ]
      }
    ];
  }
};

export default menuItems;
