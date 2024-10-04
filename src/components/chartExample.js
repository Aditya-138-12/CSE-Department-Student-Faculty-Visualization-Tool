import React, { useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsMore from 'highcharts/highcharts-more';
import HighchartsItemSeries from 'highcharts/modules/item-series';
import "./chartExample.css";

// Initialize Highcharts modules
HighchartsMore(Highcharts);
HighchartsItemSeries(Highcharts);

export function ChartExample() {
    useEffect(() => {
        const clubs = [
            { name: 'Code Arena', students: 12, color: '#FF4136', representative: { name: 'Nithish Mathangi', role: 'Representative', image: 'https://media.licdn.com/dms/image/v2/D5603AQF9qTAfqJCUmw/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1711515068792?e=1733356800&v=beta&t=EL6Pl-aMDYsIgyG5PLEOIvuYwU8cLHZj_rgfQqfkToI' } },
            { name: 'IEEE Computer Society', students: 5, color: '#0074D9', representative: { name: 'Chaman', role: 'Representative', image: 'https://media.licdn.com/dms/image/v2/D5603AQFFrjGKmQR8Fw/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1695956296009?e=1733356800&v=beta&t=t1jT4ySTRboxgR2bFBlwUBnogdxsetYpinCc3dzjIxI' } },
            { name: 'Design Club', students: 4, color: '#2ECC40', representative: { name: '', role: 'Representative', image: 'https://via.placeholder.com/50' } },
            { name: 'GDSC Club', students: 10, color: '#FFDC00', representative: { name: 'Amogh R. Gowda', role: 'Representative', image: 'https://media.licdn.com/dms/image/v2/D5603AQFN5q-YGUeofw/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1702739965560?e=1733356800&v=beta&t=09PSSMv0ikCSk6ldXLBt_1c65zm09a11d5dgc6wAvxw' } },
            { name: 'MLSA Club', students: 4, color: '#B10DC9', representative: { name: 'G. Charan', role: 'Representative', image: 'https://media.licdn.com/dms/image/v2/D5603AQExOhFKnAUQPA/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1727626813845?e=1733356800&v=beta&t=FNp1e_miQtGb0y-lXTKhTdtXZ6yGMHTKbF9ZBZ8r0k0' } },
            { name: 'Tech Team', students: 1, color: '#FF851B', representative: { name: 'Aditya Saroha', role: 'Representative', image: 'https://media.licdn.com/dms/image/v2/D5603AQGkTsPGux-7vA/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1705401026481?e=1733356800&v=beta&t=N-xtCHUY_-8WmxQ5ps1AEE3BJ-D38JuGyMVKKs7Gcuc' } },
            { name: 'Marketing Club', students: 10, color: '#7FDBFF', representative: { name: '', role: 'Representative', image: 'https://via.placeholder.com/50' } },
            { name: 'Content Creation Team', students: 4, color: '#01FF70', representative: { name: '', role: 'Representative', image: 'https://via.placeholder.com/50' } },
            { name: 'Photography Club', students: 4, color: '#F012BE', representative: { name: 'Pushpak Chakraborty', role: 'Representative', image: 'https://media.licdn.com/dms/image/v2/D5603AQE1APUXboD_QA/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1687806308006?e=1733356800&v=beta&t=LRCk9zcRUz_m4Ya9khKStGqCLrXW5ii2La8BAxaQbew' } }
        ];

        Highcharts.chart('container', {
            chart: {
                type: 'item'
            },
            title: {
                text: 'Distribution of Students in CSE Department Clubs'
            },
            subtitle: {
                text: 'Total students: 54'
            },
            legend: {
                labelFormat: '{name} <span style="opacity: 0.4">{y}</span>'
            },
            tooltip: {
                useHTML: true,
                formatter: function () {
                    const club = clubs.find(c => c.name === this.point.name);
                    return `
                        <div class="profile-tooltip">
                            <img src="${club.representative.image}" alt="${club.representative.name}" />
                            <h3>${club.name}</h3>
                            <p>Representative: ${club.representative.name}</p>
                            <p>Role: ${club.representative.role}</p>
                            <p>Students: ${club.students}</p>
                        </div>
                    `;
                }
            },
            series: [{
                name: 'Students',
                keys: ['name', 'y', 'color', 'label'],
                data: clubs.map(club => [club.name, club.students, club.color, club.name]),
                dataLabels: {
                    enabled: true,
                    format: '{point.label}',
                    style: {
                        textOutline: '3px contrast'
                    }
                },
                // Circular options
                center: ['50%', '88%'],
                size: '170%',
                startAngle: -100,
                endAngle: 100
            }],
            responsive: {
                rules: [{
                    condition: {
                        maxWidth: 600
                    },
                    chartOptions: {
                        series: [{
                            dataLabels: {
                                distance: -30
                            }
                        }]
                    }
                }]
            }
        });
    }, []);

    return <div id="container" style={{ width: '100%', height: '400px' }} />;
};