package com.example.news_app

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.tooling.preview.Preview
import com.example.news_app.ui.theme.NewsappTheme
import androidx.compose.ui.unit.dp

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            NewsappTheme {
                Scaffold(modifier = Modifier.fillMaxSize()) { innerPadding ->
                    NewsList(
                        newsItems = listOf(
                            "Exempel 1",
                            "Exempel 2",
                            "Exempel 3",
                            "Exempel 4"
                        ),
                        modifier = Modifier.padding(innerPadding)
                    )
                }
            }
        }
    }
}

@Composable
fun NewsList(newsItems: List<String>, modifier: Modifier = Modifier) {
    LazyColumn(modifier = modifier) {
        items(newsItems) { item ->
            Text(
                text = item,
                modifier = Modifier.padding(16.dp)
            )
        }
    }
}

@Preview(showBackground = true)
@Composable
fun NewsListPreview() {
    NewsappTheme {
        NewsList(
            listOf(
                "Sample News 1",
                "Sample News 2",
                "Sample News 3"
            )
        )
    }
}
