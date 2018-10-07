# React-Motion-State

Transition states powered by React-Motion

Easily control animation states within your components.

## States

React-Motion-State offers familiar components that add transition states into the component's children render prop.
Their usage is very similar to their React-Motion counterpart, except it exposes some useful state info.

### MotionState

Motion provides interpolating from one style to another.

```jsx
<MotionState defaultStyle={{ x: 0 }} style={{ x: spring(10) }}>
  {
    (interpolatingStyle, isAnimating) => <Component style={interpolatingStyle} animating={isAnimating} /> 
  }
</MotionState>
```

#### API

| Props         | Type     | Description                                   | Required |
|---------------|----------|-----------------------------------------------|----------|
| style         | Object   | Style object mapped to number or OpaqueConfig | True     |
| defaultStyle  | Object   | PlainStyle object                             | False    |
| children      | Function | Child Function                                | True     |
| onRest        | Function | Called when motion ends                       | False    |

See [React-Motion Docs: Motion](https://github.com/chenglou/react-motion/blob/master/README.md#motion-)

#### States

The `isAnimating` argument passed to the child function is a `Boolean` of if the style is in motion.

### TransitionMotionState

TransitionMotion helps you add motion to mounting and unmounting components.
The current transition state is injected in to allow you to customise the motion's behaviour between these states. 

```jsx
<TransitionMotionState
  defaultStyles={[
    { key: '1', style: { x: 0 } },
    { key: '2', style: { x: 0 } },
  ]}
  styles={[
    { key: '1', style: { x: spring(50) } },
    { key: '2', style: { x: spring(100) } },
  ]}
  willEnter={(config) => ({ x: spring(150) })}
  willLeave={(config) => ({ x: spring(0) })}
>
  {
    (interpolatedStyles) => (
      <div>
        {
          interpolatedStyles.map(config => (
            <Component key={config.key} style={config.style} transition={config.data.transition} />
          ))
        }
      </div>
    )
  }
</TransitionMotionState>
```

#### API

| Props         | Type          | Description                                   | Required |
|---------------|---------------|-----------------------------------------------|----------|
| styles        | Array<Object> | Style object mapped to number or OpaqueConfig | True     |
| defaultStyles | Array<Object> | PlainStyle object                             | False    |
| children      | Function      | Child Function                                | True     |
| willEnter     | Function      | Set the style object for newly mounted styles | False    |
| willLeave     | Function      | Called repeatedly while a style is unmounting | False    |
| didLeave      | Function      | Called when a style has finished unmounting   | False    |

if the `styles` prop is a function (supports React-Motion's implementation) there will be an additional call as the initial state is populated. 

See [React-Motion Docs: TransitionMotion](https://github.com/chenglou/react-motion/blob/master/README.md#transitionmotion-)

#### States

- `initial` - The style was included in the initial `styles` object, and is in motion.
- `initial-done` - The style was included in the initial `styles` object, and is at rest.
- `enter` - A newly added style is in motion.
- `enter-done` - A newly added style is at rest.
- `exit` - An unmounting style is in motion.

Although `exit-done` exists for unmounting styles at rest, this should never occur as the style should be removed.

### DirectinalMotionState

Predifned directions allow for easy toggling between states.
Updating the `direction` prop will trigger the motion between states.
There is potentially no limit to the amount of states that you can apply.

```jsx
<DirectionalMotionState
  defaultStyle={{ x: 0 }}
  states={{
    open: { x: spring(0) },
    close: { x: spring(-100) },
  }}
  direction="open"
>
  {
    (style, isAnimating) => (
      <Sidedraw
        style={{
          transform: `translateX(${style.x}%)`,
        }}
        isAnimating={isAnimating}
      />
    )
  }
</DirectionalMotionState>
```

#### API

| Props         | Type     | Description                            | Required |
|---------------|----------|----------------------------------------|----------|
| states        | Object   | State object for applicable directions | True     |
| defaultStyle  | Object   | Initial starting style                 | False    |
| children      | Function | Child Function                         | True     |
| onRest        | Function | Called when motion ends                | False    |

### ConditionalMotionState

Allows you to explicitly trigger the motion based on the `in` prop (similar to React-Transition-Group).

```jsx
<ConditionalMotionState
  defaultStyle={{ opacity: 0 }}
  onEnter={{
    opacity: spring(1)
  }}
  onExit={{
    opacity: spring(0)
  }}
  in={this.state.show}
  unmountOnExit
>
  {
    (style, isAnimating) => (
      <button style={style}>{!isAnimating && 'Click Me'}</button>
    )
  }
</ConditionalMotionState>
```

#### API

| Props         | Type     | Default | Description                                   | Required |
|---------------|----------|---------|-----------------------------------------------|----------|
| in            | Boolean  | false   | Determines which state to transition to       | True     |
| onEnter       | Object   | null    | Style object mapped to number or OpaqueConfig | True     |
| onExit        | Object   | null    | Style object mapped to number or OpaqueConfig | True     |
| defaultStyle  | Object   | null    | Initial starting style                        | False    |
| children      | Function | null    | Child Function                                | True     |
| onRest        | Function | null    | Called when motion ends                       | False    |
| unmountOnExit | Boolean  | false   | Unmount child component after exiting motion  | False    |
