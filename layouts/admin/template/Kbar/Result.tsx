// import {NextUITheme, useTheme} from '@nextui-org/react';
import {KBarResults, useMatches} from 'kbar';

// import {Icon} from '../Icon';
// import {IconNameType} from '../Icon/type';

export function KBarResultCustom() {
  const {results} = useMatches();
  // const {theme} = useTheme();

  console.log('results', results)

  return (
    // <KBarResults
    //   items={results}
    //   onRender={({item, active}) => {
    //     if (typeof item === 'string') return <B theme={theme}>{item}</B>;
    //     return (
    //       <ItemWrapper key={item.id} active={active} theme={theme}>
    //         {/*{item.icon && (*/}
    //         {/*  <Icon*/}
    //         {/*    name={item.icon as IconNameType}*/}
    //         {/*    fill={active ? theme?.colors.primary.value : theme?.colors.accents4.value}*/}
    //         {/*    style={{transition: 'fill 0.3s', marginRight: '12px', flexShrink: '0'}}*/}
    //         {/*  />*/}
    //         {/*)}*/}
    //         <TextWrapper>
    //           <Title>{item.name}</Title>
    //           {item.subtitle && <SubTitle
    //             // theme={theme}
    //           >{item.subtitle}</SubTitle>}
    //         </TextWrapper>
    //       </ItemWrapper>
    //     );
    //   }}
    // />
    <KBarResults
      items={results}
      onRender={({ item, active }) =>
        typeof item === "string" ? (
          <div>{item}</div>
        ) : (
          <div
            style={{
              background: active ? "#000000" : "black",
            }}
          >
            {item.name}
          </div>
        )
      }
    />
  );
}
