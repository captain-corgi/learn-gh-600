// ui_kits/chat/bi_demo.jsx — seeded BI conversation for the chat kit

const BI_MESSAGES = {
  biDemo: [
    { role: 'user', text: 'How did revenue trend last quarter, and where did it come from?' },
    {
      role: 'assistant',
      parts: [
        { kind: 'rich', render: () => (
          <>
            <p>Q3 closed at <b>$4.82M</b>, up <b>12.4%</b> QoQ and <b>23.1%</b> YoY. Here's the picture, with a few things I'd call out.</p>

            <div style={{ marginTop: 8 }}>
              <SourceChip source="warehouse.prod.sales_fact" rows={142031} />
            </div>

            <KPIRow>
              <KPI label="Revenue"     value={4820000} money delta={12.4} sparkline={[3.2,3.4,3.3,3.7,3.9,4.1,4.3,4.5,4.6,4.8]} />
              <KPI label="Avg deal"    value={18400}   money delta={4.8}  sparkline={[14,15,15,16,16,17,17,18,18,18.4]} />
              <KPI label="Win rate"    value="27.3%"          delta={2.1}  sparkline={[22,23,24,24,25,25,26,26,27,27]} />
              <KPI label="Churn"       value="3.1%"           delta={-0.6} invertDelta sparkline={[4.2,4.0,3.9,3.7,3.6,3.5,3.4,3.3,3.2,3.1]} />
            </KPIRow>

            <ChartCard
              title="Revenue by week"
              subtitle="13 weeks ending 30 Sep"
              legend={[
                { label: 'Revenue', color: 'var(--chart-1)' },
                { label: 'Forecast', color: 'var(--chart-2)' },
              ]}
              foot={<><span>Source: sales_fact · weekly grain</span><span>Updated 2 min ago</span></>}
            >
              <LineChart
                labels={['W27','W28','W29','W30','W31','W32','W33','W34','W35','W36','W37','W38','W39']}
                series={[
                  { name: 'Revenue', color: 'var(--chart-1)', values: [320,345,338,362,380,395,410,428,445,452,468,475,482] },
                  { name: 'Forecast', color: 'var(--chart-2)', values: [310,325,340,355,370,385,400,415,430,445,460,470,478] },
                ]}
                valueFmt={(n) => '$' + n + 'k'}
              />
            </ChartCard>

            <Insight kind="trend" title="Growth is coming from mid-market, not enterprise.">
              Mid-market deal count rose 38% QoQ; enterprise was flat. Average deal size is up 4.8% because a larger share of mid-market deals landed on the annual plan.
            </Insight>

            <ChartCard
              title="Revenue by segment"
              subtitle="Share of Q3 bookings"
              actions={false}
            >
              <DonutChart
                data={[
                  { label: 'Mid-market', value: 2340, color: 'var(--chart-1)' },
                  { label: 'Enterprise', value: 1580, color: 'var(--chart-2)' },
                  { label: 'SMB',        value:  620, color: 'var(--chart-3)' },
                  { label: 'Self-serve', value:  280, color: 'var(--chart-4)' },
                ]}
              />
            </ChartCard>

            <DataTable
              title="Top regions"
              meta="Ranked by Q3 revenue"
              columns={[
                { key: 'region', label: 'Region' },
                { key: 'reps',   label: 'Reps',    type: 'num' },
                { key: 'deals',  label: 'Deals',   type: 'num' },
                { key: 'rev',    label: 'Revenue', type: 'bar' },
                { key: 'qoq',    label: 'QoQ',     type: 'num' },
              ]}
              rows={[
                { region: 'North America', reps: 24, deals: 142, rev: 2140000, qoq: '+14.2%' },
                { region: 'EMEA',          reps: 18, deals:  96, rev: 1320000, qoq: '+9.8%'  },
                { region: 'APAC',          reps: 11, deals:  58, rev:  880000, qoq: '+18.4%' },
                { region: 'LATAM',         reps:  6, deals:  29, rev:  310000, qoq: '-2.1%'  },
                { region: 'Other',         reps:  3, deals:  12, rev:  170000, qoq: '+4.0%'  },
              ]}
              footer="5 of 5 regions"
            />

            <Quote cite="Meridian Labs · Q3 renewal note">
              "Moving three teams onto Lumen cut our analysis cycle from three days to an afternoon. We'll likely double seats before year-end."
            </Quote>

            <p>If you want, I can break the North America growth down by rep, or compare mid-market cohorts against last year's.</p>

            <QueryBlock
              lang="sql"
              code={'<span class="kw">SELECT</span>\n  segment,\n  <span class="fn">DATE_TRUNC</span>(<span class="str">\'week\'</span>, closed_at) <span class="kw">AS</span> week,\n  <span class="fn">SUM</span>(amount) <span class="kw">AS</span> revenue\n<span class="kw">FROM</span> sales_fact\n<span class="kw">WHERE</span> closed_at <span class="kw">BETWEEN</span> <span class="str">\'2024-07-01\'</span> <span class="kw">AND</span> <span class="str">\'2024-09-30\'</span>\n  <span class="kw">AND</span> stage = <span class="str">\'won\'</span>\n<span class="kw">GROUP BY</span> <span class="num">1</span>, <span class="num">2</span>\n<span class="kw">ORDER BY</span> week;'}
              rows={247}
              runtime="342ms"
            />
          </>
        )}
      ]
    }
  ]
};

Object.assign(window, { BI_MESSAGES });
