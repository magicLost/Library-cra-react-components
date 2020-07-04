Create lib:

- copy src folder
- make package.json from template
- make index.js with export \* from "./Button";

npm-release:

- NpmHelper - helper for make dist-lib directory with our library files
- buildNpmLib - file where we run NpmHelper
- config - config info like version, excluded files

npm publish:

- add new components to /npm-release/templates/index.templates.json
- npm run build:lib
- change version in /dist-lib/package.json
- cd ./dist-lib
- npm publish

Components:

- ArrowControls
- CallMeButton
- ErrorBoundary
- MenuItem
- MenuTab
- Table
- TextRender
- Form
- FormElements:
  - Checkbox
  - FileInput
  - Input
  - ResetButton
  - Select
  - SubmitButton
  - TextArea
- UI:
  - Anchor
  - BackDrop
  - Button
  - CloseButton
  - Image
  - ImgWithLoading
  - ImageSharp
  - ListSvg
  - ListSvgWithText
  - Logo
  - MenuButton
  - Spinner

Container:

- Carousel:
  - CarouselTranslate
  - CarouselOpacity
- ControlsFeature
- Forms:
  - Feedback
  - CalcPrice
- Scroller
