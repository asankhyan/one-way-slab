export const INITIAL_STATE = {
    configs:{
        detailedView:false
    },
    inputData : {
        clear_span:5.1,
        support_width:0.23,
        fck:30,
        fy:500,
        d:250,
        b:1000,
        effective_cover:25
    },
    designLoads:{
        live_load:5,
        extra_dead_load:4
    },
    ast:{
        bar_dia:12,
        spacing_provided:100
    },
    distSteel: {
        bar_dia:8,
        spacing_provided:150
    },
    checkShear:{
        // permissible_stress:""
    },
    checkDevLength:{
        no_hooks_Lo: 0,
        m:30,
        m_options:[
            {displayValue:"20", code:1.92},
            {displayValue:"25", code:2.24},
            {displayValue:"30", code:2.4},
            {displayValue:"35", code:2.72},
            {displayValue:"40", code:3.04}
        ]
    },
    checkDeflection:{
        // mod_fac_fy: ""
    }
}