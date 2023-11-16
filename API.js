export const APIpath = 'https://ss.prestoapi.com/api/'
export const apiserver = 'https://dev.strainseekr.com/api-server/'

/*
export async function GetToken() {
    const response = await fetch(APIpath+"login", {
      method: "POST",
      body: JSON.stringify({
        username: 'javascript@google.com',
        password: 'tXaCgBBq19'
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    });
    const data = await response.json();
    return data.token;
  };
*/
export async function GetToken() {
  const response = await axios.post(APIpath + "login", {
    username: 'js@strainseekr.com',
    password: '*uye^%!@SD8'
  }, {
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  });
  return response.data.token;
};



//new

export async function sendDataAxios(form, token) {

  const headers = {
    "Content-type": "application/json; charset=UTF-8",
    Authorization: `Bearer ${token}`
  }
  const data = {
      CustomerID: 0,
      SearchName: form.SearchName.value,
      WeightingProperty: Number(form.WeightingProperty.value),
      WeightingTaste: Number(form.WeightingTaste.value),
      WeightingSmell: 0,
      THCMin: 0,
      THCMax: Number(form.THCMax.value),
      CBDMin: 0,
      CBDMax: 100,
      DominanceIDs: "", // thc/cbd dominance cannot test
      SpeciesIDs: "", // might change to empty string
      ConditionIDs: form.ConditionIDs.value,
      SmellIDs: "", // we cannot include this at this time evidently
      TasteIDs: form.TasteIDs.value, 
      StrainTypeIDs: form.StrainTypeIDs.value, 
      ExcludedTerpeneIDs: "", // not a question need asking
      DispensaryID: 5, // hardcoded into each dispensary
      Sharable: 1,
  };


// console.log(data);
  try {
    const response = await axios.post('https://ss.prestoapi.com/api/v1_searchadd', data, { headers });
    // console.log("Server response: ", response); // log the full server response
    // console.log("Server response data: ", response.data); // log the server response data specifically
    return response.data;
  } catch (error) {
    console.log("Error: ", error);
  }
}

export async function sendSearch(data, token) {

  const headers = {
    "Content-type": "application/json; charset=UTF-8",
    Authorization: `Bearer ${token}`
  }

// console.log("SendSearch Data:" + data);
  try {
    const response = await axios.post('https://ss.prestoapi.com/api/v1_searchadd', data, { headers });
    // console.log("Server response: ", response); // log the full server response
    // console.log("Server response data: ", response.data); // log the server response data specifically
    return response.data;
  } catch (error) {
    console.log("Error: ", error);
  }
}



// search run 




export async function SearchRun(searchParams) {
  try {
    const response = await axios.get(apiserver + "v1_searchrun", {
      params: searchParams
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      throw new Error("badtoken");
    }
    console.error(error);
  }
}









// export async function SearchRun(token, searchParams) {
//   try {
//     const response = await axios.post(APIpath + "v1_searchrun", searchParams, {
//       headers: {
//         "Content-type": "application/json; charset=UTF-8",
//         "Authorization": `bearer ${token}`
//       }
//     });
//     return response.data;
//   } catch (error) {
//     if (error.response && error.response.status === 401) {
//       throw new Error("badtoken");
//     }
//     console.error(error);
//   }
// };









export async function GetCannabinoidObject(cannabinoidID) {
  const response = await axios.get(
    `${apiserver}V2_CannabinoidObject`,
    {
      params: {
        inCannabinoidID: cannabinoidID
      },
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      }
    }
  );
  if (response.status === 200) {
    return response.data;
  } else {
    throw new Error(`Failed to fetch cannabinoid properties with status code: ${response.status}`);
  }
}



export async function UpdateCannabinoidObject(cannabinoidObj, token) {
  try {
    const response = await axios.post(
      `${apiserver}V2_CannabinoidObjectUpdate`,
      cannabinoidObj,
      {
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    if (error.response.status === 401) {
      throw new Error("badtoken");
    } else {
      throw new Error(error.message);
    }
  }
}











/*
export async function GetStrainType(token,dispensaryid){
    const res = await fetch(APIpath+"v1_straintype", {
                        method: "POST",
                        body: JSON.stringify({
                            DispensaryID: dispensaryid
                        }),
                        headers: {
                        "Content-type": "application/json; charset=UTF-8",
                        "Authorization" : "bearer " + token 
                        }
                        });
    if (res.status === 401) {
        throw new Error("badtoken");
    };
    const data = await res.json();
    return data;
};
*/
export async function GetStrainType(token, dispensaryid) {
    try {
      const response = await axios.post(APIpath+"v1_straintype", {
        DispensaryID: dispensaryid
      }, {
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          "Authorization": `bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      if (error.response.status === 401) {
        throw new Error("badtoken");
      }
      console.error(error);
    }
  };


export async function GetCannabinoids(token,dispensaryid){
    const res = await fetch(APIpath+"v1_cannabinoid", {
                        method: "POST",
                        body: JSON.stringify({
                            DispensaryID: dispensaryid
                        }),
                        headers: {
                        "Content-type": "application/json; charset=UTF-8",
                        "Authorization" : "bearer " + token 
                        }
                        });
    if (res.status === 401) {
        throw new Error("badtoken");
    };
    const data = await res.json();
    return data;
};

// export async function GetCannabinoids(token, dispensaryid) {
//   try {
//     const response = await axios.post(APIpath+"v1_cannabinoid", {
//       DispensaryID: dispensaryid
//     }, {
//       headers: {
//         "Content-type": "application/json; charset=UTF-8",
//         "Authorization": `bearer ${token}`
//       }
//     });
//     return response.data;
//   } catch (error) {
//     if (error.response.status === 401) {
//       throw new Error("badtoken");
//     }
//     console.error(error);
//   }
// };

/*
export async function GetTerpenes(token,dispensaryid){
    const res = await fetch(APIpath+"v1_terpene", {
                        method: "POST",
                        body: JSON.stringify({
                            DispensaryID: dispensaryid
                        }),
                        headers: {
                        "Content-type": "application/json; charset=UTF-8",
                        "Authorization" : "bearer " + token 
                        }
                        });
    if (res.status === 401) {
        throw new Error("badtoken");
    };
    const data = await res.json();
    return data;
};
*/
export async function GetTerpenes(token, dispensaryid) {
  try {
    const response = await axios.post(APIpath+"v1_terpene", {
      DispensaryID: dispensaryid
    }, {
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "Authorization": `bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    if (error.response.status === 401) {
      throw new Error("badtoken");
    }
    console.error(error);
  }
};


/*
export async function GetSpecies(token,dispensaryid){
    const res = await fetch(APIpath+"v1_species", {
                        method: "POST",
                        body: JSON.stringify({
                            DispensaryID: dispensaryid
                        }),
                        headers: {
                        "Content-type": "application/json; charset=UTF-8",
                        "Authorization" : "bearer " + token 
                        }
                        });
    if (res.status === 401) {
        throw new Error("badtoken");
    };
    const data = await res.json();
    return data;
};
*/
export async function GetSpecies(token, dispensaryid) {
  try {
    const response = await axios.post(APIpath + "v1_species", {
      DispensaryID: dispensaryid
    }, {
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "Authorization": `bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    if (error.response.status === 401) {
      throw new Error("badtoken");
    }
    console.error(error);
  }
};

/*
export async function GetManufacturer(token,dispensaryid){
    const res = await fetch(APIpath+"v1_manufacturer", {
                        method: "POST",
                        body: JSON.stringify({
                            DispensaryID: dispensaryid
                        }),
                        headers: {
                        "Content-type": "application/json; charset=UTF-8",
                        "Authorization" : "bearer " + token 
                        }
                        });
    if (res.status === 401) {
        throw new Error("badtoken");
    };
    const data = await res.json();
    return data;
};
*/
export async function GetManufacturer(token, dispensaryid) {
  try {
    const response = await axios.post(APIpath + "v1_manufacturer", {
      DispensaryID: dispensaryid
    }, {
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "Authorization": `bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    if (error.response.status === 401) {
      throw new Error("badtoken");
    }
    console.error(error);
  }
};

/*
export async function GetTesting(token,dispensaryid){
    const res = await fetch(APIpath+"v1_testing", {
                        method: "POST",
                        body: JSON.stringify({
                            DispensaryID: dispensaryid
                        }),
                        headers: {
                        "Content-type": "application/json; charset=UTF-8",
                        "Authorization" : "bearer " + token 
                        }
                        });
    if (res.status === 401) {
        throw new Error("badtoken");
    };
    const data = await res.json();
    return data;
};
*/
export async function GetTesting(token, dispensaryid) {
  try {
    const response = await axios.post(APIpath+"v1_testing", {
      DispensaryID: dispensaryid
    }, {
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "Authorization": `bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    if (error.response.status === 401) {
      throw new Error("badtoken");
    }
    console.error(error);
  }
};

/*
export async function StrainAdd(token, parms){
    // parms is already in JSON format
    const res = await fetch(APIpath+"v1_strainadd", {
                        method: "POST",
                        body: parms,
                        headers: {
                        "Content-type": "application/json; charset=UTF-8",
                        "Authorization" : "bearer " + token 
                        }
                        });
    if (res.status === 401) {
        throw new Error("badtoken");
    };
    const data = await res.json();
    return data;
};
*/
export async function StrainAdd(token, parms) {
  try {
    const response = await axios.post(APIpath+"v1_strainadd", parms, {
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "Authorization": `bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    if (error.response.status === 401) {
      throw new Error("badtoken");
    }
    console.error(error);
  }
};

/*
export async function StrainTerpeneAdd(token, parms){
    const res = await fetch(APIpath+"v1_strainterpeneadd", {
                        method: "POST",
                        body: JSON.stringify(parms),
                        headers: {
                        "Content-type": "application/json; charset=UTF-8",
                        "Authorization" : "bearer " + token 
                        }
                        });
    if (res.status === 401) {
        throw new Error("badtoken");
    };
    const data = await res.json();
    return data;
};
*/
export async function StrainTerpeneAdd(token, parms) {
  try {
    const response = await axios.post(APIpath + "v1_strainterpeneadd", parms, {
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "Authorization": `bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    if (error.response.status === 401) {
      throw new Error("badtoken");
    }
    console.error(error);
  }
};

/*
export async function StrainCannabinoidAdd(token, parms){
    const res = await fetch(APIpath+"v1_straincannabinoidadd", {
                          method: "POST",
                          body: JSON.stringify(parms),
                          headers: {
                          "Content-type": "application/json; charset=UTF-8",
                          "Authorization" : "bearer " + token 
                          }
                          });
        if (res.status === 401) {
        throw new Error("badtoken");
    };
    const data = await res.json();
    return data;
};
*/
export async function StrainCannabinoidAdd(token, parms) {
  try {
    const response = await axios.post(APIpath + 'v1_straincannabinoidadd', parms, {
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        'Authorization': 'bearer ' + token,
      },
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      throw new Error('badtoken');
    } else {
      throw error;
    }
  }
}


export async function GetStrains(token, sss) {
    try {
      const response = await axios.post(APIpath + "v1_strain", {
        StrainID: sss
      }, {
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          "Authorization": "bearer " + token
        }
      });

      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        throw new Error("badtoken");
      } else {
        throw error;
      }
    }
  };

/*
  export async function GetStrainCannabinoid(token, strainid){
    const res = await fetch(APIpath+"v1_straincannabinoid", {
                        method: "POST",
                        body: JSON.stringify({
                            StrainID: strainid
                        }),
                        headers: {
                        "Content-type": "application/json; charset=UTF-8",
                        "Authorization" : "bearer " + token 
                        }
                        });
    if (res.status === 401) {
        throw new Error("badtoken");
    };
    const data = await res.json();
    return data;
};
*/
export async function GetStrainCannabinoid(token, strainid) {
  try {
    const response = await axios.post(
      APIpath + "v1_straincannabinoid",
      {
        StrainID: strainid,
      },
      {
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      throw new Error("badtoken");
    }
    throw error;
  }
}

/*
export async function GetStrainTerpene(token, strainid){
    const res = await fetch(APIpath+"v1_strainterpene", {
                        method: "POST",
                        body: JSON.stringify({
                            StrainID: strainid
                        }),
                        headers: {
                        "Content-type": "application/json; charset=UTF-8",
                        "Authorization" : "bearer " + token 
                        }
                        });
    if (res.status === 401) {
        throw new Error("badtoken");
    };
    const data = await res.json();
    return data;
};
*/
export async function GetStrainTerpene(token, strainid) {
  try {
    const response = await axios.post(APIpath + "v1_strainterpene", {
      StrainID: strainid
    }, {
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "Authorization": "bearer " + token
      }
    });

    return response.data;
  } catch (error) {
    if (error.response.status === 401) {
      throw new Error("badtoken");
    } else {
      throw new Error(error.message);
    }
  }
};

export async function GetStrainCondition(token, strainid) {
  try {
    const response = await axios.post(APIpath + "v1_straincondition", {
      StrainID: strainid
    }, {
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "Authorization": "bearer " + token
      }
    });

    return response.data;
  } catch (error) {
    if (error.response.status === 401) {
      throw new Error("badtoken");
    } else {
      throw new Error(error.message);
    }
  }
};

export async function GetStrainTaste(token, strainid) {
  try {
    const response = await axios.post(APIpath + "v1_straintaste", {
      StrainID: strainid
    }, {
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "Authorization": "bearer " + token
      }
    });

    return response.data;
  } catch (error) {
    if (error.response.status === 401) {
      throw new Error("badtoken");
    } else {
      throw new Error(error.message);
    }
  }
};

export async function GetStrainSmell(token, strainid) {
  try {
    const response = await axios.post(APIpath + "v1_strainsmell", {
      StrainID: strainid
    }, {
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "Authorization": "bearer " + token
      }
    });

    return response.data;
  } catch (error) {
    if (error.response.status === 401) {
      throw new Error("badtoken");
    } else {
      throw new Error(error.message);
    }
  }
};

export async function GetSmell(token, dispensaryid, straintypeid ) {
  try {
    const response = await axios.post(APIpath + "v1_smell", {
      DispensaryID: dispensaryid,
      StrainTypeIDs: straintypeid
    }, {
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "Authorization": "bearer " + token
      }
    });

    return response.data;
  } catch (error) {
    if (error.response.status === 401) {
      throw new Error("badtoken");
    } else {
      throw new Error(error.message);
    }
  }
};

export async function GetTaste(token, dispensaryid, straintypeid ) {
  try {
    const response = await axios.post(APIpath + "v1_taste", {
      DispensaryID: dispensaryid,
      StrainTypeIDs: straintypeid
    }, {
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "Authorization": "bearer " + token
      }
    });

    return response.data;
  } catch (error) {
    if (error.response.status === 401) {
      throw new Error("badtoken");
    } else {
      throw new Error(error.message);
    }
  }
};

export async function GetProperty(token ) {
  try {
    const response = await axios.post(APIpath + "v1_property", {

    }, {
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "Authorization": "bearer " + token
      }
    });

    return response.data;
  } catch (error) {
    if (error.response.status === 401) {
      throw new Error("badtoken");
    } else {
      throw new Error(error.message);
    }
  }
};

export async function GetTerpeneObject(TerpeneID) {
  try {
    const response = await axios.get(apiserver + 'V1_TerpeneObject?inTerpeneID=' + TerpeneID, {
      headers: {
        "Content-type": "application/json; charset=UTF-8"
        // "Authorization": "bearer " + token -- coming later
      }
    });

    return response.data;
  } catch (error) {
    if (error.response.status === 401) {
      throw new Error("badtoken");
    } else {
      throw new Error(error.message);
    }
  }
};




// this is a wrapper for async API functions
// if there's a badtoken (expired); it tries to get a new one
export async function retryFunction(func, token, ...args) {
  let attempts = 0;
  let maxAttempts = 3;

  while (attempts < maxAttempts) {
    try {
      const result = await func(token, ...args);
      return result;
    } catch (error) {
      if (error.message === "badtoken") {
        token = await GetToken();
        globalThis.token = token;
        console.log(token);
        attempts++;
      } else {
        throw error;
      }

      if (attempts === maxAttempts) {
        throw new Error(`Failed after ${maxAttempts} attempts`);
      }
    }
  }
};