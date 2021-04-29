function schemaChecker(body,schema){
    let values = [];
    if (typeof body !== "undefined"){
      if (typeof schema === "object")
        for (const key in schema){
            if (schema[key].type === "object")
                values.push(schemaChecker(body[key],schema[key]));
            if (key !== 'type' && key !== 'required')
            {
              const keyRequired = schema[key].required;
              const typesMatch = (schema[key].type === typeof body[key]);
              const keyExists = (key in body);

              if ((keyRequired && !keyExists) || (keyExists && !typesMatch))
                  values.push(false);
            }
        }
    }
    else{values.push(!schema.required);}
    return values.every(x => x);
}