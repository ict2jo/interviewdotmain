"use client"

import { Box, Grid } from "@mui/material";
import Link from "next/link";
import { useState } from "react";

export default function Innerlist({list}) {
return(
<div style={{width:"100%", margin:"auto", paddingTop:"20px"}}>
                {
                    list.map((k, index) => (
                        <Box  className="listbox" key={index}>
                            <Grid container>
                                <Grid item xs={3} className="lefttext">
                                    {k.instNm}
                                </Grid>
                                <Grid item xs={9}>
                                    <Link href={'/recruitmentdetail/' + k.recrutPblntSn}>
                                        {k.recrutPbancTtl}<br />
                                        <div className="smalltext">
                                            {k.recrutSeNm} & {k.acbgCondNmLst}
                                        </div>
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    ))
                }
                
            </div>

)
}