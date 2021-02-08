$(function () {
    let searchJSON;

    $.getJSON("/search.json", function (json) {
        searchJSON = json;
    });

    $("#search-input").on("keyup", function () {
        let resultsContainer = $("#results-container");
        resultsContainer.css('visibility', 'visible').html('<div class="search-item"><h1>No results.</h1></div>');
        let input_value = $(this).val();

        if (input_value.length === 0) {
            resultsContainer.css('visibility', 'hidden');
            return;
        }

        let termsList = input_value.toLowerCase().split(" ");
        let terms = termsList.filter(function (el) {
            return el != null && el.length > 0;
        });

        let first = true;
        searchJSON.forEach(function (entry) {
            let addEntry = true;
            terms.forEach(function (term) {
                if (!entry.title.toLowerCase().includes(term) &&
                    !entry.tags.toLowerCase().includes(term) &&
                    !entry.description.toLowerCase().includes(term)) {
                    addEntry = false;
                }
            });
            if (addEntry) {
                if (first) {
                    resultsContainer.css('visibility', 'visible').html('');
                    first = false;
                }
                let tagsList = entry.tags.split(", ").filter(function (tag) {
                    return tag != null && tag.length > 0;
                });
                let tags = '';
                tagsList.forEach(function (tag) {
                    tags += '<span class="topic">' + tag + '</span>&nbsp;';
                });
                $("#results-container").append(
                    '<div class="search-item"><a href="' + entry.url + '"><h1><i class="fab fa-github"></i> ' +
                    entry.repo_name + '</h1></a><span class="desc">' + entry.description + '</span><br/>' +
                    tags + '</div>'
                );
            }
        });
    });
});
