// import { Button, useTheme } from '@nextui-org/react';
import {useKBar} from 'kbar';
import {Button} from '../../../../core/Button';
import {SearchIcon} from "@heroicons/react/solid";


export function KBarToggleButton() {
  // const { theme } = useTheme();
  const {query} = useKBar();

  return (
    <Button
      onClick={() => query.toggle()}
      size="sm"
      aria-label="search button"
      icon={
        <SearchIcon className='w-5 h-5 text-gray-500 dark:text-gray-custom-503'/>
        // <Icon name="Search" width="18px" fill={theme?.colors.accents8.value}/>
    }
      // css={{backgroundColor: theme?.colors.accents2.value, height: '32px', borderRadius: theme?.radii.pill.value}}
    >Search</Button>
  );
}
