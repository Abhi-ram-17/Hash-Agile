from elasticsearch import Elasticsearch

es = Elasticsearch()

def createCollection(p_collection_name):
    # Check if the index exists
    if not es.indices.exists(index=p_collection_name):
        # Create the index (collection)
        es.indices.create(index=p_collection_name)
        print(f"Collection {p_collection_name} created.")
    else:
        print(f"Collection {p_collection_name} already exists.")
def indexData(p_collection_name, p_exclude_column):
    employee_data = [
        {'EmployeeID': 'E02001', 'Name': 'John Doe', 'Gender': 'Male', 'Department': 'IT'},
        {'EmployeeID': 'E02002', 'Name': 'Jane Doe', 'Gender': 'Female', 'Department': 'HR'}
    ]
    
    for doc in employee_data:
        if p_exclude_column in doc:
            del doc[p_exclude_column]
        es.index(index=p_collection_name, document=doc)
    
    print(f"Data indexed into {p_collection_name}, excluding column {p_exclude_column}.")
def searchByColumn(p_collection_name, p_column_name, p_column_value):
    query = {
        "query": {
            "match": {
                p_column_name: p_column_value
            }
        }
    }
    result = es.search(index=p_collection_name, body=query)
    for hit in result['hits']['hits']:
        print(hit['_source'])
def getEmpCount(p_collection_name):
    count = es.count(index=p_collection_name)['count']
    print(f"Employee count in {p_collection_name}: {count}")
def delEmpById(p_collection_name, p_employee_id):
    query = {
        "query": {
            "match": {
                "EmployeeID": p_employee_id
            }
        }
    }
    es.delete_by_query(index=p_collection_name, body=query)
    print(f"Employee {p_employee_id} deleted from {p_collection_name}.")
def getDepFacet(p_collection_name):
    query = {
        "aggs": {
            "department_counts": {
                "terms": {
                    "field": "Department.keyword"
                }
            }
        }
    }
    result = es.search(index=p_collection_name, body=query)
    buckets = result['aggregations']['department_counts']['buckets']
    for bucket in buckets:
        print(f"{bucket['key']}: {bucket['doc_count']}")
