import "reflect-metadata";
import { createConnection } from "typeorm";

import { TextWidget } from "./model/TextWidget";
import { ImageWidget } from "./model/ImageWidget";
import { ModelConverter } from "./ModelConverter";
import { WidgetEntity } from "./entity/WidgetEntity";
import { ValueWidget } from "./model/ValueWidget";

const modelConverter = new ModelConverter ();

createConnection ()
    .then ( async connection => {

        usePersistence ( connection );
    } )
    .catch ( error => console.log ( error ) );

const usePersistence = async ( connection ) => {

        const textWidget1 = new TextWidget ();
        textWidget1.name = "my-text-widget-1";
        textWidget1.type = "text-widget";
        textWidget1.text = "my-text-1";
        textWidget1.x = 10;
        textWidget1.y = 20;
        textWidget1.z = 19;
        textWidget1.width = 500;
        textWidget1.height = 350;
        textWidget1.selected = true;
        textWidget1.start = 1234567;
        textWidget1.end = 9999999;
        textWidget1.visible = true;
        textWidget1.locked = false;

        const imageWidget1 = new ImageWidget ();
        imageWidget1.name = "my-image-widget-1";
        imageWidget1.type = "image-widget";
        imageWidget1.src = "http://my-images/image-1";
        imageWidget1.x = 5;
        imageWidget1.y = 55;
        imageWidget1.z = 19;
        imageWidget1.width = 700;
        imageWidget1.height = 430;
        imageWidget1.selected = false;
        imageWidget1.start = 1111111;
        imageWidget1.end = 2222222;
        imageWidget1.visible = false;
        imageWidget1.locked = true;

        const valueWidget1 = new ValueWidget ();
        valueWidget1.name = "my-value-widget-1";
        valueWidget1.type = "value-widget";
        valueWidget1.value1 = 1;
        valueWidget1.value2 = 2;
        valueWidget1.x = 15;
        valueWidget1.y = 23;
        valueWidget1.z = 11;
        valueWidget1.width = 630;
        valueWidget1.height = 390;
        valueWidget1.selected = true;
        valueWidget1.start = 123098;
        valueWidget1.end = 768453;
        valueWidget1.visible = true;
        valueWidget1.locked = false;

        // Save differnt types of wifgets
        const textWidgetEntity1 = modelConverter.toEntity ( textWidget1 );
        const imageWidgetEntity1 = modelConverter.toEntity ( imageWidget1 );
        const valueWidgetEntity1 = modelConverter.toEntity ( valueWidget1 );

        console.log ( `textWidgetEntity1: ${JSON.stringify ( textWidgetEntity1 )}` );
        console.log ( `imageWidgetEntity1: ${JSON.stringify ( imageWidgetEntity1 )}` );
        console.log ( `valueWidgetEntity1: ${JSON.stringify ( valueWidgetEntity1 )}` );

        await connection.manager.save ( textWidgetEntity1 );
        await connection.manager.save ( imageWidgetEntity1 );
        await connection.manager.save ( valueWidgetEntity1 );

        // Get ALL the widgets
        const widgetEntities = await connection.manager.find ( WidgetEntity, { relations: [ "attributes" ] } )

        console.log ( `widgets: ${JSON.stringify ( modelConverter.toWidgets ( widgetEntities ) )}` );
}