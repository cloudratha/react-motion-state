# React-Motion-State

Transition states powered by React-Motion

Easily control animation states within your components.

## States

React-Motion-State offers familiar components that add transition states into the component's children render prop.
Their usage is very similar to their React-Motion counterpart, except it exposes some useful state info.

### MotionState

Motion provides interpolating from one style to another. While the style is in motion `state` is 

```jsx
<MotionState defaultStyle={{ x: 0 }} style={{ x: spring(10) }}>
  {
    (interpolatingStyle, state) => <Component style={interpolatingStyle} animating={state} /> 
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

The `state` argument passed to the child function is a Boolean of if the style is in motion.

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

See [React-Motion Docs: TransitionMotion](https://github.com/chenglou/react-motion/blob/master/README.md#transitionmotion-)

#### States

- `initial` - The style was included in the initial `styles` object, and is in motion.
- `initial-done` - The style was included in the initial `styles` object, and is at rest.
- `enter` - A newly added style is in motion.
- `enter-done` - A newly added style is at rest.
- `exit` - An unmounting style is in motion.

Although `exit-done` exists for unmounting styles at rest, this should never occur as the style should be removed.
