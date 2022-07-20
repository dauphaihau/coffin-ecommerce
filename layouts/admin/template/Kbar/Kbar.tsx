import {KBarAnimator, KBarPortal, KBarPositioner, KBarSearch, useKBar, VisualState} from 'kbar';

import {KBarResultCustom} from './Result';
// import KBarSearch from './Search';
import {useSearchActions} from "./useSearchActions";

import {useEffect} from "react";
import {SpotlightResults} from "./SpotlightResults.jsx";
import Backdrop from "../../../../core/Backdrop";

function Kbar() {
  const {query} = useKBar();
  console.log('query', query);

  useEffect(() => {
    function handleSpotlightShortcut(event) {
      if (
        event.ctrlKey &&
        event.key === '/' &&
        event.defaultPrevented === false
      ) {
        query.toggle();
      }
    }

    window.addEventListener('keydown', handleSpotlightShortcut, true);
    return () => window.removeEventListener('keydown', handleSpotlightShortcut, true);
  }, [query]);

  return (
    <KBarPortal>
      <Backdrop blur>
        <KBarPositioner>
          <KBarAnimator className='shadow bg-white max-w-[600px] w-full rounded-lg overflow-hidden'>
            <KBarSearch className='py-3 px-4 w-full outline-none border-none'/>
            {/*<KBarResult/>*/}
            <SpotlightResults/>
          </KBarAnimator>
        </KBarPositioner>
      </Backdrop>
    </KBarPortal>
  );
}

export default Kbar;