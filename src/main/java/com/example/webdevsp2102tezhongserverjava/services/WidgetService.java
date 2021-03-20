package com.example.webdevsp2102tezhongserverjava.services;

import com.example.webdevsp2102tezhongserverjava.models.Widget;
import org.springframework.stereotype.Service;

import java.security.PublicKey;
import java.util.*;

@Service
public class WidgetService {
    private List<Widget> widgets = new ArrayList<>();
    {
        Widget w1 = new Widget(123l, "ABC123", "HEADING", 1, "Widgets for Topic ABC123");
        Widget w2 = new Widget(234l, "ABC123", "PARAGRAPH", 1, "LALALA");
        Widget w3 = new Widget(345l, "ABC234", "HEADING", 2, "Widgets for Topic ABC234");
        Widget w4 = new Widget(456l, "ABC234", "PARAGRAPH", 1, "LALALA");
        Widget w5 = new Widget(567l, "ABC234", "PARAGRAPH", 1, "LALALA");

        widgets.add(w1);
        widgets.add(w2);
        widgets.add(w3);
        widgets.add(w4);
        widgets.add(w5);
    }

    public List<Widget> findAllWidgets() {
        return widgets;
    }

    public List<Widget> findWidgetsForTopic(String topicId) {
        List<Widget> ws = new ArrayList<>();
        for(Widget w : widgets) {
            if(w.getTopicId().equals(topicId)) {
                ws.add(w);
            }
        }
        return ws;
    }

    public Widget createWidgetForTopic(String topicId, Widget widget) {
        widget.setTopicId(topicId);
        widget.setId((new Date()).getTime());
        widgets.add(widget);
        return widget;
    }
}