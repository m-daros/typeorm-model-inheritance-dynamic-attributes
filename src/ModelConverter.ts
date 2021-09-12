import { propertiesOf } from "ts-reflection";

import { WidgetEntity } from "./entity/WidgetEntity";
import { Widget } from "./model/Widget";
import { AttributeEntity } from "./entity/AttributeEntity";
import { Attribute } from "./model/Attribute";

export class ModelConverter {

    toEntity<Type extends Widget> ( widget: Type ): WidgetEntity {

        var entity = new WidgetEntity ();
        entity.attributes = []; // TODO It will broke if I do in the constructor

        const widgetAttributeNames = propertiesOf<Type> ().map ( attribute => attribute.toString () );
        const objectAttributeNames = Object.keys ( widget );

        var extendedAttributeNames = objectAttributeNames.filter ( attributeName => ! widgetAttributeNames.includes ( attributeName ) );
        console.log ( extendedAttributeNames );

        // Store common attributes inside WidgetEntity
        widgetAttributeNames.forEach ( attributeName => {

            entity [ attributeName ] = widget [ attributeName ];
        } )

        // Store extended attributes (attributes that are in specific widgets and are not common attributes)
        extendedAttributeNames.forEach ( attributeName => {

            const attribute = new AttributeEntity ();
            attribute.name = this.resolveAttribute ( attributeName ); // TODO add resolve to the enum in order to get the enum value by the raw string value
            attribute.value = widget [ attributeName ];

            entity.addAttribute ( attribute );
        } )

        return entity;
    }

    toWidget<Type extends Widget> ( entity: WidgetEntity ): Type {

        var widget = new Widget ();
        const widgetAttributeNames = propertiesOf<Widget> ().map ( attribute => attribute.toString () );

        widgetAttributeNames.forEach ( attributeName => {

            widget [ attributeName ] = entity [ attributeName ];
        } )

        entity.attributes.forEach ( attribute => {

            widget [ attribute.name ] = attribute.value;
        } );

        return widget as unknown as Type;
    }

    toEntities<Type extends Widget> ( widgets: Type [] ): WidgetEntity [] {

        return widgets.map ( widget => this.toEntity ( widget ) );
    }

    toWidgets<Type extends Widget> ( entities: WidgetEntity [] ): Type [] {

        return entities.map ( entity => this.toWidget ( entity ) );
    }

    private resolveAttribute = ( rawWalue: string ) => {

        // TODO What happens if not found?
        return rawWalue as Attribute;
    }
}