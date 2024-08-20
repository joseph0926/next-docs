## app router에서 예약어 파일들

### 1. layout.ts

#### layout이란?

- layout 파일은 해당 경로(폴더)에 공유되는 UI입니다
- NextJs 프로젝트를 구성하면 app dir에 기본적으로 존재하는 (global) layout.ts가 존재합니다
  - 해당 layout은 앱 전체에 걸쳐서 공유되는 레이아웃입니다
  - Root Layout에서는 반드시 <html> 태그와 <body> 태그를 포함해야 합니다.
  - Root Layout에서 <head> 태그(예: <title>, <meta> 등)를 직접 추가하지 말아야 합니다.
    - 대신 Metadata API를 사용하여 이러한 메타데이터를 관리하는 것이 권장됩니다.
    - Metadata API를 사용하면 아래와 같은 이점이 생깁니다
      1. 중복 제거: 여러 컴포넌트에서 <title>이나 <meta> 태그를 정의할 경우, Next.js는 이를 자동으로 관리하고 중복된 태그를 제거합니다.
      2. 스트리밍: 페이지가 로드될 때, 메타데이터가 효율적으로 스트리밍되어 초기 페이지 로딩 속도가 향상됩니다.

#### props

1. children

- children props은 React에서와 마찬가지로 부모 컴포넌트가 감싸고 있는 자식 컴포넌트를 의미합니다

```jsx
<Layout>
  <Page />
</Layout>
```

       - 위의 예제에서 `<Page/>`가 children props을 나타냅니다

- 공식문서에서는 "Layout components should accept and use a children prop. During rendering, children will be populated with the route segments the layout is wrapping."라고 설명하고 있습니다
- 이를 예시를 통해 살펴보면 아래와 같습니다

```jsx
// app/layout.js
export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <header>My Site Header</header>
        <main>{children}</main>
        <footer>My Site Footer</footer>
      </body>
    </html>
  );
}

// app/dashboard/layout.js
export default function DashboardLayout({ children }) {
  return (
    <div>
      <aside>Dashboard Sidebar</aside>
      <section>{children}</section>
    </div>
  );
}

// app/dashboard/page.js
export default function DashboardPage() {
  return <h1>Dashboard Content</h1>;
}
```

- 이를 렌더링하면 아래와 같은 형태가 됩니다

```html
<html>
  <body>
    <header>My Site Header</header>
    <main>
      <div>
        <aside>Dashboard Sidebar</aside>
        <section>
          <h1>Dashboard Content</h1>
        </section>
      </div>
    </main>
    <footer>My Site Footer</footer>
  </body>
</html>
```

- 정리하면: Layout 컴포넌트는 그 경로의 "틀"을 제공하고, children은 그 틀 안에 들어가는 내용물(하위 페이지나 컴포넌트)을 제공합니다.

2. parmas (optional)

| Example                         | URL          | params                  |
| ------------------------------- | ------------ | ----------------------- |
| app/dashboard/[team]/layout.js  | /dashboard/1 | { team: '1' }           |
| app/shop/[tag]/[item]/layout.js | /shop/1/2    | { tag: '1', item: '2' } |
| app/blog/[...slug]/layout.js    | /blog/1/2    | { slug: ['1', '2'] }    |

- 이는 해당 Example처럼의 경로에서 layout에서 params들이 어떻게 찍히는지에 대한 예시입니다
