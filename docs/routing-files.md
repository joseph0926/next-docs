## app router에서 예약어 파일들

### 1. layout.tsx

#### layout이란?

- layout 파일은 해당 경로(폴더)에 공유되는 UI입니다
- NextJs 프로젝트를 구성하면 app dir에 기본적으로 존재하는 (global) layout.tsx가 존재합니다
  - 해당 layout은 앱 전체에 걸쳐서 공유되는 레이아웃입니다
  - Root Layout에서는 반드시 `<html>` 태그와 `<body>` 태그를 포함해야 합니다.
  - Root Layout에서 `<head>` 태그(예: `<title>`, `<meta>` 등)를 직접 추가하지 말아야 합니다.
    - 대신 Metadata API를 사용하여 이러한 메타데이터를 관리하는 것이 권장됩니다.
    - Metadata API를 사용하면 아래와 같은 이점이 생깁니다
      1. 중복 제거: 여러 컴포넌트에서 `<title>`이나 `<meta>` 태그를 정의할 경우, Next.js는 이를 자동으로 관리하고 중복된 태그를 제거합니다.
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

2. params (optional)

| Example                         | URL          | params                  |
| ------------------------------- | ------------ | ----------------------- |
| app/dashboard/[team]/layout.js  | /dashboard/1 | { team: '1' }           |
| app/shop/[tag]/[item]/layout.js | /shop/1/2    | { tag: '1', item: '2' } |
| app/blog/[...slug]/layout.js    | /blog/1/2    | { slug: ['1', '2'] }    |

- 이는 해당 Example처럼의 경로에서 layout에서 params들이 어떻게 찍히는지에 대한 예시입니다

#### layout.tsx는 searchParams, pathname을 받지 못합니다

- layout.tsx는 page.ts와 달리 props로 searchParams를 받지 못합니다

  - 왜냐하면 layout은 여러 페이지 (여러 url)에 공유될 수 있고, 이러한 layout은 성능을 위해 페이지 이동에 따라 재렌더링 하지 않습니다.
  - 이러면 발생하는 문제가 A 페이지에 대한 searchParam을 layout에서 가지고 있다가 B 페이지로 전환하여 새로운 searchParam으로 바뀌어도, layout은 재렌더링되지 않기 때문에 여전히 이전 searchParam을 가지고있는다는 문제가 존재합니다.
  - 따라서 layout.tsx에는 props로 searchParams를 받지 않습니다

- 같은 이유로 pathname도 layout에서 접근 할 수 없습니다

### 2. page.tsx

- page.tsx는 폴더 라우팅에서 해당 라우터의 고유한 UI 컴포넌트입니다

#### props

1. params

| Example                         | URL          | params                  |
| ------------------------------- | ------------ | ----------------------- |
| app/dashboard/[team]/layout.js  | /dashboard/1 | { team: '1' }           |
| app/shop/[tag]/[item]/layout.js | /shop/1/2    | { tag: '1', item: '2' } |
| app/blog/[...slug]/layout.js    | /blog/1/2    | { slug: ['1', '2'] }    |

- 이는 해당 Example처럼의 경로에서 page에서 params들이 어떻게 찍히는지에 대한 예시입니다

2. searchParams

| URL           | searchParams       |
| ------------- | ------------------ |
| /shop?a=1     | { a: '1' }         |
| /shop?a=1&b=2 | { a: '1', b: '2' } |
| /shop?a=1&a=2 | { a: ['1', '2'] }  |

- 이는 해당 URL처럼의 경로에서 page에서 searchParams들이 어떻게 찍히는지에 대한 예시입니다
- searchParams는 값을 미리 알 수 없는 동적 API이기 때문에, 해당 값을 사용하면 정적 렌더링이 아닌, 동적 렌더링으로 선택됩니다
- searchParams는 일반 js 객체를 반환합니다

### 3. loading.tsx

### 4. not-found.tsx

- not-found 파일은 경로 세그먼트 내에서 `notFound()` 함수가 `throw` 될때 UI를 렌더링하는 데 사용됩니다.
- 사용자 지정 UI를 제공하는 것과 함께 Next.js는 스트리밍된 응답의 경우 200 HTTP 상태 코드를 반환하고 스트리밍되지 않은 응답의 경우 404를 반환합니다.

  - 스트리밍 기능을 사용하는 컴포넌트에서 `notFound()`가 던져질 경우 => 200
  - 스트리밍 기능을 사용하지 않는 컴포넌트에서 `notFound()`가 던져지거나, 아예 없는 페이지일 경우 => 404

- 루트 app/not-found.js 파일은 `throw`된 `notFound()` 오류를 포착하는 것 외에도, 전체 애플리케이션의 일치하지 않는 URL도 처리합니다.

  - 즉, 앱에서 처리하지 않는 URL을 방문하는 사용자에게는 app/not-found.js 파일에서 내보낸 UI가 표시됩니다.

- 기본적으로 not-found는 서버 컴포넌트입니다.

### 5. error.tsx

- error.tsx의 역할은 예기치 않은 **런타임** 오류를 처리하고 대체 UI를 표시할 수 있습니다.

  - 여기서 말하는 런타임이란?: 프로그램이 실행 중일 때 발생하는 오류

- error.tsx의 내부 동작
  - error.tsx라는 파일을 정의하면 next 자체적으로 내부에서 경로 세그먼트를 나타내는 page 컴포넌트를 ErrorBoundary로 감싸서 page내에서 발생하는 에러를 캐치하여 처리합니다
  - 내부적으로 ErrorBoundary를 사용하기 때문에 error.tsx는 반드시 클라이언트 컴포넌트여야합니다.

#### props

1. error

- error.tsx로 전달된 에러 객체 인스턴스입니다.

  - 이 에러 객체는 개발 환경에서는 에러에 대한 모든 메시지를 포함하고있지만, 프로덕션 환경에서는 서버측 메시지는 나타나지 않습니다

- error 객체에는 message와 digest 속성이 존재합니다

  - message: 클라이언트 컴포넌트에서 발생한 오류를 캐치한 경우, 해당 message는 모든 정보가 포함됩니다 / 반면 서버 컴포넌트에서 발생한 오류를 캐치하는 경우, 앞서 언급했듯이 서버측 메시지는 제외되어 전달됩니다

    - 위의 내용은 프로덕션 기준이고, 개발 서버 기준에서는 모든 메시지가 표시됩니다

  - digest: 에러 객체의 해시입니다. 이 해시는 고유한 값을 가지며, 해당 해시를 통해 서버 측 에러에 대한 자세한 내용을 파악할 수 있습니다

2. reset

- 어떠한 에러로 인해 렌더링을 실패한 컴포넌트에 대해서 다시 렌더링을 시도할 수 있도록 해주는 함수입니다
  - 사용되는 시나리오는, 에러가 일시적인 것이라 다시 시도했을 시에 정상적으로 동작할 수 있기 때문에, 유저에게 다시 시도할 수 있는 권한을 주는 것입니다
  - 만약 다시 시도했을 때 정상적이라면, error.tsx가 렌더링되는 것이 아닌, 원래 렌더링 될려던 것이 렌더링됩니다

### 6. global-error.tsx

- 루트 레벨의 layout, template 파일에서 발생하는 에러의 경우 해당 global-error.tsx에서 처리 할 수 있습니다.
  - global-error.tsx에는 `<html>`, `<body>`태그가 정의되어야합니다
  - 마찬가지로 클라이언트 컴포넌트여야합니다
  - 프로덕션에서만 활성화됩니다. 개발 환경에서는 오류 오버레이가 대신 표시됩니다.

### 7. template.tsx

- template.tsx와 layout.tsx 둘 다 레이아웃이나 페이지를 감싸는 역할을 하지만, template.tsx는 라우트 간에 상태를 유지하지 않고, 네비게이션 시마다 자식 컴포넌트(Client Components 경우)가 새로 마운트됩니다.
- 주로 페이지 뷰 로깅등의 기능이 필요할 때 사용합니다
- 기본적으로 서버 컴포넌트로 동작하지만, "use client" 지시문을 통해 클라이언트 컴포넌트로 사용할 수 있습니다.
- 동일한 템플릿을 공유하는 라우트 간에 네비게이션이 이루어질 때마다, 템플릿의 새로운 인스턴스가 마운트되고, DOM 요소가 재생성되며, 클라이언트 컴포넌트의 상태가 유지되지 않고 효과가 다시 동기화됩니다.
