from http.server import BaseHTTPRequestHandler, HTTPServer
import json
import mysql.connector
from mysql.connector import errorcode
import bcrypt

class SimpleHandler(BaseHTTPRequestHandler):
    #  do_OPTIONS -> makes the server to allow website to request POST
    def do_OPTIONS(self):
        self.send_response(200)                                                             # ok -> tells website its ok to post
        self.send_header('Access-Control-Allow-Origin', '*')                                # Allow requests from any origin (*)
        self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')                   # Allow only POST and OPTIONS methods
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')                    # Allow the 'Content-Type' header in requests
        self.end_headers()                                                                  # End headers (required after setting headers)
        # these are necessary to accept post

    def do_POST(self):
        content_length = int(self.headers['Content-Length'])                                # Gets the length of the incoming POST data (from 'Content-Length' header)
        post_data = self.rfile.read(content_length)                                         # Reads the actual POST data (e.g., JSON, form data)
        data = json.loads(post_data.decode('utf-8'))                                        # Decodes and parses incoming POST data in json
        print(data)
        try:
            conn = mysql.connector.connect(                                                 # connecting to database
                host='127.0.0.1',
                user='root',
                password='Nani@237',
                database='MOVIEBOARD'
            )
        
        except Exception:
            self.send_response(500)                                                                # Internal error -> connecting to database
            response = {'message': 'Unable to connect database'}
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            # these are necessary to after post
            self.wfile.write(json.dumps(response).encode('utf-8'))                                 # encodes and sends response message to website
            return
                
        if self.path == '/signup':
            email = data['email']
            username = data['username']
            password = data['password']
            print(email, username, password)
            bcrypt_password = password.encode('utf-8')
            print(bcrypt_password)
            hashed_password = bcrypt.hashpw(bcrypt_password, bcrypt.gensalt())
            print(hashed_password)            

            try:
                cursor = conn.cursor()                                                             # Create a database cursor (allows executing SQL queries)
                query1 = "INSERT INTO USERS (EMAIL, USER_NAME, USER_PASSWORD) VALUES (%s, %s, %s)"
                cursor.execute(query1, (email, username, hashed_password))                          # Execute the query with user-provided values
                query2 = "SELECT USER_ID FROM USERS WHERE EMAIL = %s"
                cursor.execute(query2, (email,))
                result = cursor.fetchone()
                print(result)
                user_id = result[0]
                print(user_id)
                self.send_response(201)                                                            # created -> signup success
                response = {'message': 'Registered successfully', 'user_id': user_id}

            except mysql.connector.IntegrityError as err:
                if err.errno == errorcode.ER_DUP_ENTRY:
                    self.send_response(409)                                                        # conflict -> duplicate user
                    response = {'message': 'Email already registered, Try login'}
                else:
                    raise                                                                          # handling other integrity error cases
            
            except Exception:                                                                      # handling all other unexpected error cases
                self.send_response(500)                                                            # Internal error -> unexpected error
                response = {'message':'unexpected error'}
            
            finally:
                conn.commit()                                                                      # Commit the transaction (saves changes to the database)
                cursor.close()                                                                     # Close the cursor
                conn.close()                                                                       # Close the database connection    
            

        elif self.path == '/login':
            email = data['email']
            password = data['password']
            print(email, password)
            bcrypt_password = password.encode('utf-8')
            print(bcrypt_password)

            try:
                cursor = conn.cursor()  
                query = "SELECT USER_ID, USER_PASSWORD FROM USERS WHERE EMAIL = %s"
                cursor.execute(query, (email,))
                result = cursor.fetchone()
                print(result)
                if result is None:
                    self.send_response(400)
                    response = {'message':'Email not registered, Try Signup'}
                else:
                    user_id = result[0]
                    res = result[1]
                    print(user_id, res)
                    bcrypt_res = res.encode('utf-8')
                    print(bcrypt_res)
                    if bcrypt.checkpw(bcrypt_password, bcrypt_res):
                        self.send_response(200)
                        response = {'message':'Login successful', 'user_id': user_id}
                    else:
                        self.send_response(401) 
                        response = {'message':'Incorrect password'}
            
            except Exception:
                self.send_response(500)
                response = {'message':'unexpected error'}
            
            finally:
                conn.commit()
                cursor.close()
                conn.close()

        elif self.path == '/add':
            user_id = data['user_id']
            movie_id = data['movie_id']
            state = data['state']
            print(user_id, movie_id, state)

            try:
                cursor = conn.cursor()
                query = "INSERT INTO USERS_DATA (USER_ID, MOVIE_ID, STATE) VALUES (%s, %s, %s)"
                cursor.execute(query, (user_id, movie_id, state))
                self.send_response(200)
                response = {'message': 'success'}

            except Exception:
                self.send_response(500)
                response = {'message':'unexpected error'}
            
            finally:
                conn.commit()
                cursor.close()
                conn.close()

        elif self.path == '/remove':
            user_id = data['user_id']
            movie_id = data['movie_id']
            state = data['state']
            print(user_id, movie_id, state)

            try:
                cursor = conn.cursor()
                query = "DELETE FROM USERS_DATA WHERE USER_ID = %s AND MOVIE_ID = %s AND STATE = %s;"
                cursor.execute(query, (user_id, movie_id, state))
                self.send_response(200)
                response = {'message': 'success'}

            except Exception:
                self.send_response(500)
                response = {'message':'unexpected error'}
            
            finally:
                conn.commit()
                cursor.close()
                conn.close()

        elif self.path == '/check':
            user_id = data['user_id']
            movie_id = data['movie_id']
            print(user_id, movie_id)

            try:
                cursor = conn.cursor()
                query = "SELECT STATE FROM USERS_DATA WHERE USER_ID = %s AND MOVIE_ID = %s;"
                cursor.execute(query, (user_id, movie_id))
                result = cursor.fetchall()
                print(result)
                self.send_response(200)
                response = {'message': 'success', 'result': result}

            except Exception:
                self.send_response(500)
                response = {'message':'unexpected error'}
            
            finally:
                conn.commit()
                cursor.close()
                conn.close()

        elif self.path == '/profile':
            user_id = data['user_id']
            print(user_id)

            try:
                cursor = conn.cursor()
                query1 = "SELECT EMAIL, USER_NAME FROM USERS WHERE USER_ID = %s"
                cursor.execute(query1, (user_id,))
                result = cursor.fetchone()
                print(result)
                email = result[0]
                username = result[1]
                print(email, username)
                query2 = "SELECT COUNT(*) FROM USERS_DATA WHERE USER_ID = %s AND STATE = 'watched';"
                cursor.execute(query2, (user_id,))
                result = cursor.fetchone()
                print(result)
                watched_count = result[0]
                query2 = "SELECT COUNT(*) FROM USERS_DATA WHERE USER_ID = %s AND STATE = 'watchlisted';"
                cursor.execute(query2, (user_id,))
                result = cursor.fetchone()
                print(result)
                watchlisted_count = result[0]
                self.send_response(200)
                response = {'message': 'Details fetched succesfully', 'username': username, 'email': email, 'watched_count': watched_count, 'watchlisted_count': watchlisted_count}
            
            except Exception:
                self.send_response(500)
                response = {'message':'unexpected error'}
            
            finally:
                conn.commit()
                cursor.close()
                conn.close()

        elif self.path == '/watched' or self.path == '/watchlisted':
            user_id = data['user_id']
            page = data['page']            
            state = self.path[1:]
            print(user_id, page, state)

            try:
                cursor = conn.cursor()
                query = "SELECT MOVIE_ID FROM USERS_DATA WHERE USER_ID = %s AND STATE = %s LIMIT 30 OFFSET %s;"
                cursor.execute(query, (user_id, state, (page-1)*30))
                result = cursor.fetchall()
                print(result)
                self.send_response(200)
                response = {'message': 'success', 'result': result}

            except Exception:
                self.send_response(500)
                response = {'message':'unexpected error'}
            
            finally:
                conn.commit()
                cursor.close()
                conn.close()

        self.send_header('Content-type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()
        self.wfile.write(json.dumps(response).encode('utf-8'))

        

if __name__ == "__main__":
    server = HTTPServer(('localhost', 8001), SimpleHandler)
    print("Python server running at http://localhost:8001")
    server.serve_forever()