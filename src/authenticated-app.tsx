import React from "react";
import { ProjectListScreen } from "./screen/project-list";
import { useAuth } from "./context/auth-context";
import styled from "@emotion/styled";
import { Row } from "./components/lib";
import { ReactComponent as SoftwareLogo } from "./assets/software-logo.svg";
import { Button, Dropdown, Menu } from "antd";

export const AuthenticatedApp = () => {

  const { logout, user } = useAuth();


  return (
    <Container>
      <Header between={true}>
        <HeaderLeft gap={true}>
          <SoftwareLogo width={"18rem"} color={"rgb(38,132,255)"}/>
          <h3>项目</h3>
          <h3>用户</h3>
        </HeaderLeft>
        <HeaderRight>
          <Dropdown overlay={<Menu>
            <Menu.Item key={"logout"}>
              <Button type={"link"} onClick={logout}>登出</Button>
            </Menu.Item>
          </Menu>}>
            <Button type={"link"} onClick={event => event.preventDefault()}>
              Hi, {user?.name}
            </Button>
          </Dropdown>
        </HeaderRight>
      </Header>

      <Main>
        <ProjectListScreen/>
      </Main>

    </Container>
  );
  // <div>
  //   <button onClick={logout}>登出</button>
  //   <ProjectListScreen/>
  // </div>;
};

const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr;
  height: 100vh;
`;

// const PageHeader = styled.header`
// height: 6rem;
// `;

const Main = styled.main`
height: calc(100vh - 6rem);
`;

// flex布局
const Header = styled(Row)`
padding: 3.2rem;
box-shadow: 0 0 5px 0 rgba(0,0,0,0.1);
z-index: 1;
//display: flex;
//flex-direction: row;
//align-items: center;
//justify-content: space-between; // 里面的标签元素留有空白
`;

const HeaderLeft = styled(Row)`
//display: flex;
//align-items: center;
`;
const HeaderRight = styled.div`

`;


// grid 布局
// const Header = styled.header`
// grid-area: header
// `;
// const Main = styled.main`
// grid-area: main;
// `;
// const Nav = styled.nav`
// grid-area: nav;
// `;
// const Aside = styled.aside`
// grid-area: aside;
// `;
// const Footer = styled.footer`
// grid-area: footer;
// `;
// const Container = styled.div`
// display: grid;
// grid-template-rows: 6rem 1fr 6rem; // 100vh - 6rem -6rem
// grid-template-columns: 2rem 1fr 20rem; // 100vh - 2rem -2rem
// grid-template-areas:
// "header header header"
// "nav main aside"
// "footer footer footer"
// ;
// height: 100vh;
// grid-gap: 10rem; // 每个area的距离
// `
