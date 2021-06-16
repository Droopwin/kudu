import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import 'antd/dist/antd.css';
import Kudu from './types/Kudu';
import KuduGrid from './components/Grid';
import {Col, Layout, Row, Tabs} from "antd";
import KuduTable from "./components/Table";
import Filters, {initialFilters} from "./components/Filters";
import KuduFilters from "./types/KuduFilters";
import useKudus from "./hooks/useKudus";
import BarChart from "./components/BarChart";
import LineChart from "./components/LineChart";



const sleep = (ms: number): Promise<number> =>
    new Promise(resolve => setTimeout(resolve, ms));
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function App() {
  const [filters, changeFilters] = useState<KuduFilters>(initialFilters)
  const [loading, setLoading] = useState(true);
  const [allKudus, setKudus] = useState<Kudu[]>([]);
  const filteredKudus = useKudus(allKudus, filters);
  useEffect(() => {
    fetch('./dataset.json').then(res => res.json()).then((retrievedKudus: Kudu[]) => {
      sleep(1000).then(() => {
        setLoading(false);
        setKudus(retrievedKudus);
      })

    });
  }, []);

  return (
    <div className="App">
      <Layout className="layout">
        <Layout.Header>
          <img src={logo} className="App-logo" alt="logo" />
        </Layout.Header>
        <Layout.Content>
          <div className="site-layout-content">
            {loading ?
                <p>
                  <img src={logo} className="App-logo" alt="logo" />
                </p>
                : <>
                  <Filters kudus={allKudus} changeFilters={changeFilters} />
                  <Tabs defaultActiveKey="2" centered>
                    <Tabs.TabPane tab="Grid" key="1">
                       <KuduGrid kudus={filteredKudus} />
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="List" key="2">
                      <KuduTable kudus={filteredKudus} />
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="Data" key="3">
                      <Row>
                        <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                        <BarChart kudus={filteredKudus} />
                      </Col>
                        <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                        <LineChart kudus={filteredKudus} />
                      </Col>
                      </Row>
                    </Tabs.TabPane>
                  </Tabs>
                </>}
          </div>
        </Layout.Content>
        <Layout.Footer style={{ textAlign: 'center' }}>Ant Design ©2018</Layout.Footer>
      </Layout>
    </div>
  );
}

export default App;
